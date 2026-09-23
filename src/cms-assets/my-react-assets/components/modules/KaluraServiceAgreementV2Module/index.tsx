// Kalura Service Agreement module V2
//
// Purpose:
// - Preserve the currently working HubSpot quote-editor behavior exactly.
// - For the published/signing render, load the complete participant-edited
//   Service Agreement from ONE HubSpot Quote CRM property.
// - The WordPress Service Agreement plugin synchronizes that property before
//   it queues the existing recall -> publish worker.
//
// Required HubSpot Quote property:
//   kalura_service_agreement_data
//
// Property type:
//   Multi-line text
//
// The property contains JSON for the complete participant-editable agreement.
// Using one property keeps the CRM schema small and supports Sections 1-25,
// without changing the existing HubSpot editor fields.

import { Island } from "@hubspot/cms-components";
// @ts-expect-error -- ?island is not typed
import ServiceAgreementIsland from "./islands/ServiceAgreement?island";
import type { FieldValues } from "./fields";

interface HublData {
  quoteId?: string | number | null;
  isQuoteBlueprint?: boolean;
  isInEditor?: boolean;
  isInPreviewer?: boolean;
  participantDataJson?: string | null;
}

interface Props {
  fieldValues: FieldValues;
  hublData: HublData;
}

export const hublDataTemplate = `
  {% set quoteId = quoteTemplateContext.quote.hs_object_id %}

  {% if quoteId and not is_in_editor and not is_in_previewer and not isQuoteBlueprint %}
    {% set quoteRecord = crm_object("quote", quoteId) %}
    {% set participantDataJson = quoteRecord.kalura_service_agreement_data|default("") %}
  {% else %}
    {% set participantDataJson = "" %}
  {% endif %}

  {% set hublData = {
    "quoteId": quoteId,
    "isQuoteBlueprint": isQuoteBlueprint,
    "isInEditor": is_in_editor,
    "isInPreviewer": is_in_previewer,
    "participantDataJson": participantDataJson
  } %}
`;

export function Component({ fieldValues, hublData }: Props) {
  const quoteId = hublData?.quoteId ? String(hublData.quoteId) : null;
  const isQuoteBlueprint = Boolean(hublData?.isQuoteBlueprint);
  const isInEditor = Boolean(hublData?.isInEditor);
  const isInPreviewer = Boolean(hublData?.isInPreviewer);

  // CRITICAL: never merge participant CRM data while the HubSpot quote editor
  // is open. This preserves the current working editor behavior unchanged.
  let publishedParticipantData: Partial<FieldValues> = {};

  if (!isInEditor && !isInPreviewer && !isQuoteBlueprint) {
    const json = hublData?.participantDataJson || "";

    if (json) {
      try {
        const parsed = JSON.parse(json);
        if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
          // WordPress sanitizes object keys with sanitize_key(), which
          // lowercases camelCase keys (e.g. consentPersonalInfo ->
          // consentpersonalinfo). Map the stored keys back to the exact
          // React FieldValues names before merging them.
          const keyMap: Record<string, keyof FieldValues> = {
            heading: "heading",
            participantfullname: "participantFullName",
            participantdateofbirth: "participantDateOfBirth",
            participantaddress: "participantAddress",
            participantsuburb: "participantSuburb",
            participantstate: "participantState",
            participantpostcode: "participantPostcode",
            ndisnumber: "ndisNumber",
            ndisplanstartdate: "ndisPlanStartDate",
            ndisplanenddate: "ndisPlanEndDate",
            agreementstartdate: "agreementStartDate",
            agreementenddate: "agreementEndDate",
            agreementintro: "agreementIntro",
            planmanagement: "planManagement",
            ndisplanattached: "ndisPlanAttached",
            ndisplannotshared: "ndisPlanNotShared",
            claimnonface: "claimNonFace",
            claimtravellabour: "claimTravelLabour",
            claimtravelnonlabour: "claimTravelNonLabour",
            claimcancellation: "claimCancellation",
            claimreports: "claimReports",
            conditions: "conditions",
            conditionreasons: "conditionReasons",
            fundingcomponent: "fundingComponent",
            fundingdates: "fundingDates",
            fundingnotes: "fundingNotes",
            supportitem1: "supportItem1",
            supportdescription1: "supportDescription1",
            supportprice1: "supportPrice1",
            supportdelivery1: "supportDelivery1",
            supportitem2: "supportItem2",
            supportdescription2: "supportDescription2",
            supportprice2: "supportPrice2",
            supportdelivery2: "supportDelivery2",
            supportitem3: "supportItem3",
            supportdescription3: "supportDescription3",
            supportprice3: "supportPrice3",
            supportdelivery3: "supportDelivery3",
            consentpersonalinfo: "consentPersonalInfo",
            consentproviders: "consentProviders",
            consentresearch: "consentResearch",
            consentndisportal: "consentNdisPortal",
            consentndisplan: "consentNdisPlan",
            consentndisportion: "consentNdisPortion",
            photoservice: "photoService",
            photomarketing: "photoMarketing",
            photopublications: "photoPublications",
            newsletter: "newsletter",
            serviceopportunities: "serviceOpportunities",
            consentgiven: "consentGiven",
            consentname: "consentName",
            understanding: "understanding",
            communicationused: "communicationUsed",
            communicationdeclined: "communicationDeclined",
            communicationnotrequired: "communicationNotRequired",
            independentadvice: "independentAdvice",
            participantsigningname: "participantSigningName",
            participantsigningdate: "participantSigningDate",
            representativename: "representativeName",
            representativedate: "representativeDate",
            kalurasigningname: "kaluraSigningName",
            kalurasignature: "kaluraSignature",
            kaluradate: "kaluraDate",
          };

          const normalized: Partial<FieldValues> = {};
          for (const [storedKey, value] of Object.entries(parsed)) {
            const fieldKey = keyMap[storedKey];
            if (fieldKey) {
              normalized[fieldKey] = value as FieldValues[typeof fieldKey];
            }
          }
          publishedParticipantData = normalized;
        }
      } catch (_error) {
        // Keep the normal HubSpot field values if the CRM JSON is invalid.
        publishedParticipantData = {};
      }
    }
  }

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
  label: "Kalura Service Agreement V2",
  content_types: ["QUOTE", "QUOTE_BLUEPRINT"],
};
