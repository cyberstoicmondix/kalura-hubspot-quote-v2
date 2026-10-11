import {
  BooleanField,
  FieldGroup,
  ModuleFields,
  TextField,
} from "@hubspot/cms-components/fields";

/**
 * HubSpot-owned editor fields for the Kalura Service Agreement.
 *
 * These fields are the persistent source of truth for Sections 1–23 and 25.
 * Section 24 is deliberately excluded because it is participant-controlled
 * and is persisted by the WordPress participant endpoint.
 */
export interface FieldValues {
  heading: string;

  participantFullName: string;
  participantDateOfBirth: string;
  participantAddress: string;
  participantSuburb: string;
  participantState: string;
  participantPostcode: string;

  ndisNumber: string;
  ndisPlanStartDate: string;
  ndisPlanEndDate: string;
  agreementStartDate: string;
  agreementEndDate: string;
  agreementIntro: string;
  planManagement: string;
  ndisPlanAttached: boolean;
  ndisPlanNotShared: boolean;

  claimNonFace: string;
  claimTravelLabour: string;
  claimTravelNonLabour: string;
  claimCancellation: string;
  claimReports: string;

  conditions: string;
  conditionReasons: string;

  fundingComponent: string;
  fundingDates: string;
  fundingNotes: string;

  supportItem1: string;
  supportDescription1: string;
  supportPrice1: string;
  supportDelivery1: string;
  supportItem2: string;
  supportDescription2: string;
  supportPrice2: string;
  supportDelivery2: string;
  supportItem3: string;
  supportDescription3: string;
  supportPrice3: string;
  supportDelivery3: string;

  understanding: boolean;
  communicationUsed: boolean;
  communicationDeclined: boolean;
  communicationNotRequired: boolean;
  independentAdvice: boolean;

  participantSigningName: string;
  participantSigningDate: string;
  representativeName: string;
  representativeDate: string;
  kaluraSigningName: string;
  kaluraSignature: string;
  kaluraDate: string;

  // Section 24 (Participant Consent Form). Type-only: these are NOT HubSpot
  // module fields. Participants fill them in; values are supplied at render
  // time from the quote property kalura_service_agreement_v2_data.
  consentPersonalInfo?: "yes" | "no" | "";
  consentProviders?: "yes" | "no" | "";
  consentResearch?: "yes" | "no" | "";
  consentNdisPortal?: "yes" | "no" | "";
  consentNdisPlan?: "yes" | "no" | "";
  consentNdisPortion?: "yes" | "no" | "";
  photoService?: "yes" | "no" | "";
  photoMarketing?: "yes" | "no" | "";
  photoPublications?: "yes" | "no" | "";
  newsletter?: "yes" | "no" | "";
  serviceOpportunities?: "yes" | "no" | "";
  consentGiven?: boolean;
  consentName?: string;

  // Section 23 (Schedule of Supports, 7 columns x 6 rows). Type-only, like
  // Section 24: values arrive from the quote property at render time.
  supportItemNameNumber1?: string;
  supportItemDescription1?: string;
  supportServiceDayTimeLocation1?: string;
  supportFrequency1?: string;
  supportPriceHour1?: string;
  supportQuantity1?: string;
  supportTotalPrice1?: string;
  supportItemNameNumber2?: string;
  supportItemDescription2?: string;
  supportServiceDayTimeLocation2?: string;
  supportFrequency2?: string;
  supportPriceHour2?: string;
  supportQuantity2?: string;
  supportTotalPrice2?: string;
  supportItemNameNumber3?: string;
  supportItemDescription3?: string;
  supportServiceDayTimeLocation3?: string;
  supportFrequency3?: string;
  supportPriceHour3?: string;
  supportQuantity3?: string;
  supportTotalPrice3?: string;
  supportItemNameNumber4?: string;
  supportItemDescription4?: string;
  supportServiceDayTimeLocation4?: string;
  supportFrequency4?: string;
  supportPriceHour4?: string;
  supportQuantity4?: string;
  supportTotalPrice4?: string;
  supportItemNameNumber5?: string;
  supportItemDescription5?: string;
  supportServiceDayTimeLocation5?: string;
  supportFrequency5?: string;
  supportPriceHour5?: string;
  supportQuantity5?: string;
  supportTotalPrice5?: string;
  supportItemNameNumber6?: string;
  supportItemDescription6?: string;
  supportServiceDayTimeLocation6?: string;
  supportFrequency6?: string;
  supportPriceHour6?: string;
  supportQuantity6?: string;
  supportTotalPrice6?: string;
}

export const fields = (
  <ModuleFields>
    <FieldGroup name="section1" label="Section 1 — Parties & Participant Details">
      <TextField name="heading" label="Agreement Heading" default="SERVICE AGREEMENT" />
      <TextField name="participantFullName" label="Participant Full Name" default="" />
      <TextField name="participantDateOfBirth" label="Participant Date of Birth" default="" />
      <TextField name="participantAddress" label="Participant Address" default="" />
      <TextField name="participantSuburb" label="Participant Suburb" default="" />
      <TextField name="participantState" label="Participant State" default="" />
      <TextField name="participantPostcode" label="Participant Postcode" default="" />
      <TextField name="ndisNumber" label="NDIS Number" default="" />
      <TextField name="ndisPlanStartDate" label="NDIS Plan Start Date" default="" />
      <TextField name="ndisPlanEndDate" label="NDIS Plan End Date" default="" />
      <TextField name="planManagement" label="Plan Management" default="" />
      <TextField name="agreementStartDate" label="Agreement Start Date" default="" />
      <TextField name="agreementEndDate" label="Agreement End Date" default="" />
      <TextField name="agreementIntro" label="Agreement Introduction" default="" allowNewLine />
      <BooleanField name="ndisPlanAttached" label="NDIS Plan Attached" default={false} />
      <BooleanField name="ndisPlanNotShared" label="NDIS Plan Not Shared" default={false} />
    </FieldGroup>

    <FieldGroup name="sections2to10" label="Sections 2–10 — Agreement Terms">
      <TextField name="claimNonFace" label="Claim — Non-Face-to-Face" default="" />
      <TextField name="claimTravelLabour" label="Claim — Travel Labour" default="" />
      <TextField name="claimTravelNonLabour" label="Claim — Travel Non-Labour" default="" />
      <TextField name="claimCancellation" label="Claim — Cancellation" default="" />
      <TextField name="claimReports" label="Claim — Reports" default="" />
      <TextField name="conditions" label="Conditions" default="" allowNewLine />
      <TextField name="conditionReasons" label="Condition Reasons" default="" allowNewLine />
    </FieldGroup>

    <FieldGroup name="sections11to18" label="Sections 11–18 — Funding & Supports">
      <TextField name="fundingComponent" label="Funding Component" default="" />
      <TextField name="fundingDates" label="Funding Period Dates" default="" />
      <TextField name="fundingNotes" label="Funding Notes" default="" allowNewLine />

      <TextField name="supportItem1" label="Support Item 1" default="" />
      <TextField name="supportDescription1" label="Support Description 1" default="" allowNewLine />
      <TextField name="supportPrice1" label="Support Price 1" default="" allowNewLine />
      <TextField name="supportDelivery1" label="Support Delivery 1" default="" allowNewLine />

      <TextField name="supportItem2" label="Support Item 2" default="" />
      <TextField name="supportDescription2" label="Support Description 2" default="" allowNewLine />
      <TextField name="supportPrice2" label="Support Price 2" default="" allowNewLine />
      <TextField name="supportDelivery2" label="Support Delivery 2" default="" allowNewLine />

      <TextField name="supportItem3" label="Support Item 3" default="" />
      <TextField name="supportDescription3" label="Support Description 3" default="" allowNewLine />
      <TextField name="supportPrice3" label="Support Price 3" default="" allowNewLine />
      <TextField name="supportDelivery3" label="Support Delivery 3" default="" allowNewLine />
    </FieldGroup>

    <FieldGroup name="sections19to23" label="Sections 19–23 — Communication & Schedule">
      <BooleanField name="understanding" label="Agreement Explained / Understood" default={false} />
      <BooleanField name="communicationUsed" label="Communication Support Used" default={false} />
      <BooleanField name="communicationDeclined" label="Communication Support Offered and Declined" default={false} />
      <BooleanField name="communicationNotRequired" label="Communication Support Not Required" default={false} />
      <BooleanField name="independentAdvice" label="Opportunity for Independent Advice" default={false} />
    </FieldGroup>

    <FieldGroup name="section25" label="Section 25 — Agreement Signatures">
      <TextField name="participantSigningName" label="Participant Signing Name" default="" />
      <TextField name="participantSigningDate" label="Participant Signing Date" default="" />
      <TextField name="representativeName" label="Participant Representative Name" default="" />
      <TextField name="representativeDate" label="Participant Representative Date" default="" />
      <TextField name="kaluraSigningName" label="KALURA Signing Name" default="" />
      <TextField name="kaluraSignature" label="KALURA Signature" default="" />
      <TextField name="kaluraDate" label="KALURA Date" default="" />
    </FieldGroup>
  </ModuleFields>
);
