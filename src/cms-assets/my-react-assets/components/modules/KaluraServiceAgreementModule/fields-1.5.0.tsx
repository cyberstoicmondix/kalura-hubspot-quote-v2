import { ModuleFields, TextField, NumberField, BooleanField } from "@hubspot/cms-components/fields";

export interface FieldValues {
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
  syncMessage: string;
  participantFullName: string;
  ndisNumber: string;
}

export const fields = (
  <ModuleFields>
    <TextField
      name="planManagement"
      label="Plan Management"
      default=""
    />
    <BooleanField
      name="ndisPlanAttached"
      label="Ndis Plan Attached"
      default={false}
    />
    <BooleanField
      name="ndisPlanNotShared"
      label="Ndis Plan Not Shared"
      default={false}
    />
    <TextField
      name="claimNonFace"
      label="Claim Non Face"
      default=""
    />
    <TextField
      name="claimTravelLabour"
      label="Claim Travel Labour"
      default=""
    />
    <TextField
      name="claimTravelNonLabour"
      label="Claim Travel Non Labour"
      default=""
    />
    <TextField
      name="claimCancellation"
      label="Claim Cancellation"
      default=""
    />
    <TextField
      name="claimReports"
      label="Claim Reports"
      default=""
    />
    <TextField
      name="conditions"
      label="Conditions"
      default=""
    />
    <TextField
      name="conditionReasons"
      label="Condition Reasons"
      default=""
    />
    <TextField
      name="fundingComponent"
      label="Funding Component"
      default=""
    />
    <TextField
      name="fundingDates"
      label="Funding Dates"
      default=""
    />
    <TextField
      name="fundingNotes"
      label="Funding Notes"
      default=""
    />
    <TextField
      name="supportItem1"
      label="Support Item1"
      default=""
    />
    <TextField
      name="supportDescription1"
      label="Support Description1"
      default=""
    />
    <TextField
      name="supportPrice1"
      label="Support Price1"
      default=""
    />
    <TextField
      name="supportDelivery1"
      label="Support Delivery1"
      default=""
    />
    <TextField
      name="supportItem2"
      label="Support Item2"
      default=""
    />
    <TextField
      name="supportDescription2"
      label="Support Description2"
      default=""
    />
    <TextField
      name="supportPrice2"
      label="Support Price2"
      default=""
    />
    <TextField
      name="supportDelivery2"
      label="Support Delivery2"
      default=""
    />
    <TextField
      name="supportItem3"
      label="Support Item3"
      default=""
    />
    <TextField
      name="supportDescription3"
      label="Support Description3"
      default=""
    />
    <TextField
      name="supportPrice3"
      label="Support Price3"
      default=""
    />
    <TextField
      name="supportDelivery3"
      label="Support Delivery3"
      default=""
    />
    <BooleanField
      name="understanding"
      label="Understanding"
      default={false}
    />
    <BooleanField
      name="communicationUsed"
      label="Communication Used"
      default={false}
    />
    <BooleanField
      name="communicationDeclined"
      label="Communication Declined"
      default={false}
    />
    <BooleanField
      name="communicationNotRequired"
      label="Communication Not Required"
      default={false}
    />
    <BooleanField
      name="independentAdvice"
      label="Independent Advice"
      default={false}
    />
    <TextField
      name="participantSigningName"
      label="Participant Signing Name"
      default=""
    />
    <TextField
      name="participantSigningDate"
      label="Participant Signing Date"
      default=""
    />
    <TextField
      name="representativeName"
      label="Representative Name"
      default=""
    />
    <TextField
      name="representativeDate"
      label="Representative Date"
      default=""
    />
    <TextField
      name="kaluraSigningName"
      label="Kalura Signing Name"
      default=""
    />
    <TextField
      name="kaluraSignature"
      label="Kalura Signature"
      default=""
    />
    <TextField
      name="kaluraDate"
      label="Kalura Date"
      default=""
    />
    <TextField
      name="syncMessage"
      label="Sync Message"
      default=""
    />
    <TextField
      name="participantFullName"
      label="Participant Full Name"
      default=""
    />
    <TextField
      name="ndisNumber"
      label="Ndis Number"
      default=""
    />
  </ModuleFields>
);
