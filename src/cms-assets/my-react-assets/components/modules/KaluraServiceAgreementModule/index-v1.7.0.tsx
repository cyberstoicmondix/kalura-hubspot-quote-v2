// Kalura Service Agreement module v1.7.0
//
// IMPORTANT:
// - This version does NOT use getServerSideProps, so it does not require
//   Content Hub Pro/Enterprise server-side React data fetching.
// - Editor behavior is intentionally preserved: when isInEditor is true,
//   HubSpot's existing module field values are used unchanged.
// - For the published participant/signing render, Section 24 is read from
//   HubSpot QUOTE CRM properties that must be synchronized from WordPress
//   before the quote is republished.
//
// Required HubSpot quote property internal names:
//   kalura_sa_consent_personal_info
//   kalura_sa_consent_providers
//   kalura_sa_consent_research
//   kalura_sa_consent_ndis_portal
//   kalura_sa_consent_ndis_plan
//   kalura_sa_consent_ndis_portion
//   kalura_sa_photo_service
//   kalura_sa_photo_marketing
//   kalura_sa_photo_publications
//   kalura_sa_newsletter
//   kalura_sa_service_opportunities
//   kalura_sa_consent_given
//   kalura_sa_consent_name
//
// The WordPress participant-save endpoint must write these quote properties
// before triggering the existing recall/re-publish worker.

import { Island } from "@hubspot/cms-components";
// @ts-expect-error -- ?island is not typed
import ServiceAgreementIsland from "./islands/ServiceAgreement?island";
import type { FieldValues } from "./fields";

interface ParticipantServerData {
  consentPersonalInfo?: string;
  consentProviders?: string;
  consentResearch?: string;
  consentNdisPortal?: string;
  consentNdisPlan?: string;
  consentNdisPortion?: string;
  photoService?: string;
  photoMarketing?: string;
  photoPublications?: string;
  newsletter?: string;
  serviceOpportunities?: string;
  consentgiven?: boolean | string;
  consentname?: string;
}

interface HublData {
  quoteId?: string | number | null;
  isQuoteBlueprint?: boolean;
  isInEditor?: boolean;
  isInPreviewer?: boolean;
  participantData?: ParticipantServerData;
}

interface Props {
  fieldValues: FieldValues;
  hublData: HublData;
}

export const hublDataTemplate = `
  {% set quoteId = quoteTemplateContext.quote.hs_object_id %}

  {% if quoteId and not is_in_editor and not is_in_previewer and not isQuoteBlueprint %}
    {% set quoteRecord = crm_object("quote", quoteId) %}

    {% set participantData = {
      "consentPersonalInfo": quoteRecord.kalura_sa_consent_personal_info|default(""),
      "consentProviders": quoteRecord.kalura_sa_consent_providers|default(""),
      "consentResearch": quoteRecord.kalura_sa_consent_research|default(""),
      "consentNdisPortal": quoteRecord.kalura_sa_consent_ndis_portal|default(""),
      "consentNdisPlan": quoteRecord.kalura_sa_consent_ndis_plan|default(""),
      "consentNdisPortion": quoteRecord.kalura_sa_consent_ndis_portion|default(""),
      "photoService": quoteRecord.kalura_sa_photo_service|default(""),
      "photoMarketing": quoteRecord.kalura_sa_photo_marketing|default(""),
      "photoPublications": quoteRecord.kalura_sa_photo_publications|default(""),
      "newsletter": quoteRecord.kalura_sa_newsletter|default(""),
      "serviceOpportunities": quoteRecord.kalura_sa_service_opportunities|default(""),
      "consentgiven": quoteRecord.kalura_sa_consent_given|default(""),
      "consentname": quoteRecord.kalura_sa_consent_name|default("")
    } %}
  {% else %}
    {% set participantData = {} %}
  {% endif %}

  {% set hublData = {
    "quoteId": quoteId,
    "isQuoteBlueprint": isQuoteBlueprint,
    "isInEditor": is_in_editor,
    "isInPreviewer": is_in_previewer,
    "participantData": participantData
  } %}
`;

export function Component({ fieldValues, hublData }: Props) {
  const quoteId = hublData?.quoteId ? String(hublData.quoteId) : null;
  const isQuoteBlueprint = Boolean(hublData?.isQuoteBlueprint);
  const isInEditor = Boolean(hublData?.isInEditor);
  const isInPreviewer = Boolean(hublData?.isInPreviewer);

  // CRITICAL: Do not merge participant CRM data while the quote editor is
  // open. This preserves the current working editor behavior exactly as-is.
  const publishedParticipantData =
    !isInEditor && !isInPreviewer && !isQuoteBlueprint
      ? hublData?.participantData || {}
      : {};

  const effectiveFieldValues = {
    ...fieldValues,
    ...publishedParticipantData,
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
