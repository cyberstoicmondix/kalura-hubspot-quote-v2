import {
  BooleanField,
  ModuleFields,
  TextField,
} from "@hubspot/cms-components/fields";

/**
 * HubSpot-owned fields for the Kalura Service Agreement.
 *
 * These fields represent the editor-controlled portions of the agreement:
 * Sections 1–23 and 25. Section 24 is intentionally NOT represented here;
 * it is participant-controlled and is stored through the WordPress
 * participant endpoint.
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

  claimNonFace: "yes" | "no" | "";
  claimTravelLabour: "yes" | "no" | "";
  claimTravelNonLabour: "yes" | "no" | "";
  claimCancellation: "yes" | "no" | "";
  claimReports: "yes" | "no" | "";

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
}

export const fields = (
  <ModuleFields>
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
    <TextField name="agreementStartDate" label="Agreement Start Date" default="" />
    <TextField name="agreementEndDate" label="Agreement End Date" default="" />
    <TextField name="agreementIntro" label="Agreement Introduction" default="" />

    <TextField name="planManagement" label="Plan Management" default="" />
    <BooleanField name="ndisPlanAttached" label="NDIS Plan Attached" default={false} />
    <BooleanField name="ndisPlanNotShared" label="NDIS Plan Not Shared" default={false} />

    <TextField name="claimNonFace" label="Claim Non-Face-to-Face" default="" />
    <TextField name="claimTravelLabour" label="Claim Travel Labour" default="" />
    <TextField name="claimTravelNonLabour" label="Claim Travel Non-Labour" default="" />
    <TextField name="claimCancellation" label="Claim Cancellation" default="" />
    <TextField name="claimReports" label="Claim Reports" default="" />

    <TextField name="conditions" label="Conditions" default="" />
    <TextField name="conditionReasons" label="Condition Reasons" default="" />

    <TextField name="fundingComponent" label="Funding Component" default="" />
    <TextField name="fundingDates" label="Funding Dates" default="" />
    <TextField name="fundingNotes" label="Funding Notes" default="" />

    <TextField name="supportItem1" label="Support Item 1" default="" />
    <TextField name="supportDescription1" label="Support Description 1" default="" />
    <TextField name="supportPrice1" label="Support Price 1" default="" />
    <TextField name="supportDelivery1" label="Support Delivery 1" default="" />

    <TextField name="supportItem2" label="Support Item 2" default="" />
    <TextField name="supportDescription2" label="Support Description 2" default="" />
    <TextField name="supportPrice2" label="Support Price 2" default="" />
    <TextField name="supportDelivery2" label="Support Delivery 2" default="" />

    <TextField name="supportItem3" label="Support Item 3" default="" />
    <TextField name="supportDescription3" label="Support Description 3" default="" />
    <TextField name="supportPrice3" label="Support Price 3" default="" />
    <TextField name="supportDelivery3" label="Support Delivery 3" default="" />

    <BooleanField name="understanding" label="Agreement Explained / Understood" default={false} />
    <BooleanField name="communicationUsed" label="Communication Support Used" default={false} />
    <BooleanField name="communicationDeclined" label="Communication Support Offered and Declined" default={false} />
    <BooleanField name="communicationNotRequired" label="Communication Support Not Required" default={false} />
    <BooleanField name="independentAdvice" label="Opportunity for Independent Advice" default={false} />

    <TextField name="participantSigningName" label="Participant Signing Name" default="" />
    <TextField name="participantSigningDate" label="Participant Signing Date" default="" />
    <TextField name="representativeName" label="Participant Representative Name" default="" />
    <TextField name="representativeDate" label="Participant Representative Date" default="" />
    <TextField name="kaluraSigningName" label="KALURA Signing Name" default="" />
    <TextField name="kaluraSignature" label="KALURA Signature" default="" />
    <TextField name="kaluraDate" label="KALURA Date" default="" />
  </ModuleFields>
);
