// Kalura Service Agreement module V2 (participant edits Section 24 only)
//
// Purpose:
// - Preserve the currently working HubSpot quote-editor behavior exactly.
// - For the published/signing render, load the complete participant-edited
//   Service Agreement from ONE HubSpot Quote CRM property.
// - The WordPress Service Agreement plugin synchronizes that property before
//   it queues the existing recall -> publish worker.
//
// Required HubSpot Quote property:
//   kalura_service_agreement_v2_data
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
    {% set participantDataJson = quoteRecord.kalura_service_agreement_v2_data|default("") %}
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
            supportitemnamenumber1: "supportItemNameNumber1",
            supportitemdescription1: "supportItemDescription1",
            supportservicedaytimelocation1: "supportServiceDayTimeLocation1",
            supportfrequency1: "supportFrequency1",
            supportpricehour1: "supportPriceHour1",
            supportquantity1: "supportQuantity1",
            supporttotalprice1: "supportTotalPrice1",
            supportitemnamenumber2: "supportItemNameNumber2",
            supportitemdescription2: "supportItemDescription2",
            supportservicedaytimelocation2: "supportServiceDayTimeLocation2",
            supportfrequency2: "supportFrequency2",
            supportpricehour2: "supportPriceHour2",
            supportquantity2: "supportQuantity2",
            supporttotalprice2: "supportTotalPrice2",
            supportitemnamenumber3: "supportItemNameNumber3",
            supportitemdescription3: "supportItemDescription3",
            supportservicedaytimelocation3: "supportServiceDayTimeLocation3",
            supportfrequency3: "supportFrequency3",
            supportpricehour3: "supportPriceHour3",
            supportquantity3: "supportQuantity3",
            supporttotalprice3: "supportTotalPrice3",
            supportitemnamenumber4: "supportItemNameNumber4",
            supportitemdescription4: "supportItemDescription4",
            supportservicedaytimelocation4: "supportServiceDayTimeLocation4",
            supportfrequency4: "supportFrequency4",
            supportpricehour4: "supportPriceHour4",
            supportquantity4: "supportQuantity4",
            supporttotalprice4: "supportTotalPrice4",
            supportitemnamenumber5: "supportItemNameNumber5",
            supportitemdescription5: "supportItemDescription5",
            supportservicedaytimelocation5: "supportServiceDayTimeLocation5",
            supportfrequency5: "supportFrequency5",
            supportpricehour5: "supportPriceHour5",
            supportquantity5: "supportQuantity5",
            supporttotalprice5: "supportTotalPrice5",
            supportitemnamenumber6: "supportItemNameNumber6",
            supportitemdescription6: "supportItemDescription6",
            supportservicedaytimelocation6: "supportServiceDayTimeLocation6",
            supportfrequency6: "supportFrequency6",
            supportpricehour6: "supportPriceHour6",
            supportquantity6: "supportQuantity6",
            supporttotalprice6: "supportTotalPrice6",
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
              (normalized as Record<string, unknown>)[fieldKey] = value;
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
