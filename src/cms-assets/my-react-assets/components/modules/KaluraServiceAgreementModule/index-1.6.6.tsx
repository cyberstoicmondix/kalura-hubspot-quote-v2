// Kalura Service Agreement module v1.6.6
//
// Important rendering change:
// HubSpot renders quote modules at publish time. The participant/editor data is
// persisted in WordPress, so the module must read that record on the HubSpot
// server during the publish render. This makes the latest participant edits
// part of the generated signing snapshot without trying to write custom module
// state through the Quotes API.

import { Island, withModuleProps } from "@hubspot/cms-components";
// @ts-expect-error -- ?island is not typed
import ServiceAgreementIsland from "./islands/ServiceAgreement?island";
import type { FieldValues } from "./fields";

const AGREEMENT_API_BASE =
  "https://kalura.com.au/wp-json/kalura/v1/service-agreement";

interface HublData {
  quoteId?: string | number | null;
  isQuoteBlueprint?: boolean;
  isInEditor?: boolean;
  isInPreviewer?: boolean;
}

interface ServerAgreementResponse {
  success?: boolean;
  quote_id?: string;
  data?: Record<string, unknown>;
}

interface ServerSideAgreementProps {
  agreementData: Record<string, unknown>;
}

interface ModuleProps {
  fieldValues: FieldValues;
  hublData: HublData;
}

export const getServerSideProps = withModuleProps(
  async ({ hublData }: ModuleProps) => {
    const quoteId = hublData?.quoteId ? String(hublData.quoteId) : "";
    const isQuoteBlueprint = Boolean(hublData?.isQuoteBlueprint);

    // Quote blueprints do not have a real quote ID. There is nothing to load.
    if (!quoteId || isQuoteBlueprint) {
      return {
        serverSideProps: {
          agreementData: {},
        } satisfies ServerSideAgreementProps,
        caching: {
          cacheControl: {
            noCache: true,
          },
        },
      };
    }

    try {
      // The participant endpoint is intentionally the complete Service
      // Agreement record. It is also the same record the participant browser
      // currently reads/writes. Using it here avoids needing an Origin header
      // from HubSpot's server-side renderer, which the /editor endpoint would
      // reject by design.
      const response = await fetch(
        `${AGREEMENT_API_BASE}/${encodeURIComponent(quoteId)}/participant`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error(`Service Agreement API returned HTTP ${response.status}`);
      }

      const result = (await response.json()) as ServerAgreementResponse;
      const agreementData =
        result && result.data && typeof result.data === "object"
          ? result.data
          : {};

      return {
        serverSideProps: {
          agreementData,
        } satisfies ServerSideAgreementProps,
        // Do not allow HubSpot's default module cache to serve an older
        // participant record after a recall -> publish cycle.
        caching: {
          cacheControl: {
            noCache: true,
          },
        },
      };
    } catch (error) {
      // Keep the existing HubSpot module-field values as the safe fallback if
      // WordPress is temporarily unavailable. The participant-side browser
      // still has its normal REST loading path after hydration.
      console.error("Kalura Service Agreement server-side load error:", error);

      return {
        serverSideProps: {
          agreementData: {},
        } satisfies ServerSideAgreementProps,
        caching: {
          cacheControl: {
            noCache: true,
          },
        },
      };
    }
  }
);

export const hublDataTemplate = `
  {% set hublData = {
    "quoteId": quoteTemplateContext.quote.hs_object_id,
    "isQuoteBlueprint": isQuoteBlueprint,
    "isInEditor": is_in_editor,
    "isInPreviewer": is_in_previewer
  } %}
`;

interface Props {
  fieldValues: FieldValues;
  hublData: HublData;
  serverSideProps?: ServerSideAgreementProps;
}

export function Component({
  fieldValues,
  hublData,
  serverSideProps,
}: Props) {
  const quoteId = hublData?.quoteId ? String(hublData.quoteId) : null;
  const isQuoteBlueprint = Boolean(hublData?.isQuoteBlueprint);
  const isInEditor = Boolean(hublData?.isInEditor);
  const isInPreviewer = Boolean(hublData?.isInPreviewer);

  // Merge the freshly fetched WordPress record over HubSpot's saved module
  // field values. The React island therefore starts server-rendering with the
  // latest participant data, which is exactly what HubSpot captures when the
  // quote is published/signing snapshot is generated.
  //
  // The island's existing client-side REST load remains in place. That keeps
  // editor/participant editing behavior unchanged after hydration.
  const serverAgreementData = serverSideProps?.agreementData || {};
  const effectiveFieldValues = {
    ...fieldValues,
    ...serverAgreementData,
  } as FieldValues;

  const props = {
    ...effectiveFieldValues,
    quoteId,
    isQuoteBlueprint,
    isInPreviewer,
    isInEditor,
  };

  return (
    <Island
      module={ServiceAgreementIsland}
      hydrateOn="load"
      {...props}
    />
  );
}

export { fields } from "./fields";

export const meta = {
  label: "Kalura Service Agreement",
  content_types: ["QUOTE", "QUOTE_BLUEPRINT"],
};
