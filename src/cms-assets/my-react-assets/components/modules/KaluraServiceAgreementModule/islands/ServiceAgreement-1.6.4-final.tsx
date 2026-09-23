// Kalura Service Agreement module v1.6.4
import { useEffect, useRef, useState } from "react";
import styles from "../ServiceAgreement.module.css";

import type { FieldValues } from "../fields";

import signatureImage from "../shaun_signature.png";

interface Props extends FieldValues {
  isInEditor?: boolean;
  quoteId?: string | null;
  isQuoteBlueprint?: boolean;
  isInPreviewer?: boolean;
}

interface YesNoProps {
  name: string;
  label: string;
  value: "yes" | "no" | "";
  onChange: (value: "yes" | "no") => void;
}

function YesNo({ name, label, value, onChange }: YesNoProps) {
  return (
    <div className={styles.consentRow}>
      <div className={styles.consentQuestion}>{label}</div>

      <label className={styles.yesNoOption}>
        <input
          type="radio"
          name={name}
          checked={value === "yes"}
          onChange={() => onChange("yes")}
        />
        <span>Yes</span>
      </label>

      <label className={styles.yesNoOption}>
        <input
          type="radio"
          name={name}
          checked={value === "no"}
          onChange={() => onChange("no")}
        />
        <span>No</span>
      </label>
    </div>
  );
}

function CheckboxRow({
  children,
  checked,
  onChange,
}: {
  children: React.ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className={styles.checkboxRow}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span>{children}</span>
    </label>
  );
}

function TextInput({
  value,
  onChange,
  placeholder = "",
  className = "",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <input
      className={`${styles.formInput} ${className}`}
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

function TextArea({
  value,
  onChange,
  rows = 3,
}: {
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <textarea
      className={styles.formTextarea}
      value={value}
      rows={rows}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className={styles.sectionHeading}>{children}</h2>;
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className={styles.subHeading}>{children}</h3>;
}

function BulletList({ children }: { children: React.ReactNode }) {
  return <ul className={styles.bulletList}>{children}</ul>;
}

export default function ServiceAgreement({
  heading,
  participantFullName,
  participantDateOfBirth,
  participantAddress,
  participantSuburb,
  participantState,
  participantPostcode,
  ndisNumber,
  ndisPlanStartDate,
  ndisPlanEndDate,
  agreementStartDate,
  agreementEndDate,
  agreementIntro,
  planManagement: planManagementProp,
  ndisPlanAttached: ndisPlanAttachedProp,
  ndisPlanNotShared: ndisPlanNotSharedProp,
  claimNonFace: claimNonFaceProp,
  claimTravelLabour: claimTravelLabourProp,
  claimTravelNonLabour: claimTravelNonLabourProp,
  claimCancellation: claimCancellationProp,
  claimReports: claimReportsProp,
  conditions: conditionsProp,
  conditionReasons: conditionReasonsProp,
  fundingComponent: fundingComponentProp,
  fundingDates: fundingDatesProp,
  fundingNotes: fundingNotesProp,
  supportItem1: supportItem1Prop,
  supportDescription1: supportDescription1Prop,
  supportPrice1: supportPrice1Prop,
  supportDelivery1: supportDelivery1Prop,
  supportItem2: supportItem2Prop,
  supportDescription2: supportDescription2Prop,
  supportPrice2: supportPrice2Prop,
  supportDelivery2: supportDelivery2Prop,
  supportItem3: supportItem3Prop,
  supportDescription3: supportDescription3Prop,
  supportPrice3: supportPrice3Prop,
  supportDelivery3: supportDelivery3Prop,
  understanding: understandingProp,
  communicationUsed: communicationUsedProp,
  communicationDeclined: communicationDeclinedProp,
  communicationNotRequired: communicationNotRequiredProp,
  independentAdvice: independentAdviceProp,
  participantSigningName: participantSigningNameProp,
  participantSigningDate: participantSigningDateProp,
  representativeName: representativeNameProp,
  representativeDate: representativeDateProp,
  kaluraSigningName: kaluraSigningNameProp,
  kaluraSignature: kaluraSignatureProp,
  kaluraDate: kaluraDateProp,
  quoteId,
  isQuoteBlueprint,
  isInPreviewer,
  isInEditor,
}: Props) {
  const [agreementHeading, setAgreementHeading] = useState(heading || "SERVICE AGREEMENT");
  const [fullName, setFullName] = useState(participantFullName || "");
  const [dateOfBirth, setDateOfBirth] = useState(participantDateOfBirth || "");
  const [address, setAddress] = useState(participantAddress || "");
  const [suburb, setSuburb] = useState(participantSuburb || "");
  const [state, setState] = useState(participantState || "");
  const [postcode, setPostcode] = useState(participantPostcode || "");

  const [ndisNumberValue, setNdisNumberValue] = useState(ndisNumber || "");
  const [ndisStartDate, setNdisStartDate] = useState(ndisPlanStartDate || "");
  const [ndisEndDate, setNdisEndDate] = useState(ndisPlanEndDate || "");

  const [startDate, setStartDate] = useState(agreementStartDate || "");
  const [endDate, setEndDate] = useState(agreementEndDate || "");

  const [planManagement, setPlanManagement] = useState(planManagementProp || "");

  const [ndisPlanAttached, setNdisPlanAttached] = useState(Boolean(ndisPlanAttachedProp));
  const [ndisPlanNotShared, setNdisPlanNotShared] = useState(Boolean(ndisPlanNotSharedProp));

  const [claimNonFace, setClaimNonFace] = useState<"yes" | "no" | "">(claimNonFaceProp || "");
  const [claimTravelLabour, setClaimTravelLabour] = useState<"yes" | "no" | "">(
    claimTravelLabourProp || ""
  );
  const [claimTravelNonLabour, setClaimTravelNonLabour] = useState<
    "yes" | "no" | ""
  >(claimTravelNonLabourProp || "");
  const [claimCancellation, setClaimCancellation] = useState<"yes" | "no" | "">(
    claimCancellationProp || ""
  );
  const [claimReports, setClaimReports] = useState<"yes" | "no" | "">(claimReportsProp || "");

  const [conditions, setConditions] = useState(conditionsProp || "");
  const [conditionReasons, setConditionReasons] = useState(conditionReasonsProp || "");

  const [fundingComponent, setFundingComponent] = useState(fundingComponentProp || "");
  const [fundingDates, setFundingDates] = useState(fundingDatesProp || "");
  const [fundingNotes, setFundingNotes] = useState(fundingNotesProp || "");

  const [supportItem1, setSupportItem1] = useState(supportItem1Prop || "");
  const [supportDescription1, setSupportDescription1] = useState(supportDescription1Prop || "");
  const [supportPrice1, setSupportPrice1] = useState(supportPrice1Prop || "");
  const [supportDelivery1, setSupportDelivery1] = useState(supportDelivery1Prop || "");

  const [supportItem2, setSupportItem2] = useState(supportItem2Prop || "");
  const [supportDescription2, setSupportDescription2] = useState(supportDescription2Prop || "");
  const [supportPrice2, setSupportPrice2] = useState(supportPrice2Prop || "");
  const [supportDelivery2, setSupportDelivery2] = useState(supportDelivery2Prop || "");

  const [supportItem3, setSupportItem3] = useState(supportItem3Prop || "");
  const [supportDescription3, setSupportDescription3] = useState(supportDescription3Prop || "");
  const [supportPrice3, setSupportPrice3] = useState(supportPrice3Prop || "");
  const [supportDelivery3, setSupportDelivery3] = useState(supportDelivery3Prop || "");

  const [consentPersonalInfo, setConsentPersonalInfo] = useState<"yes" | "no" | "">("");
  const [consentProviders, setConsentProviders] = useState<"yes" | "no" | "">("");
  const [consentResearch, setConsentResearch] = useState<"yes" | "no" | "">("");
  const [consentNdisPortal, setConsentNdisPortal] = useState<"yes" | "no" | "">("");
  const [consentNdisPlan, setConsentNdisPlan] = useState<"yes" | "no" | "">("");
  const [consentNdisPortion, setConsentNdisPortion] = useState<
    "yes" | "no" | ""
  >("");

  const [photoService, setPhotoService] = useState<"yes" | "no" | "">("");
  const [photoMarketing, setPhotoMarketing] = useState<"yes" | "no" | "">("");
  const [photoPublications, setPhotoPublications] = useState<"yes" | "no" | "">("");

  const [newsletter, setNewsletter] = useState<"yes" | "no" | "">("");
  const [serviceOpportunities, setServiceOpportunities] = useState<
    "yes" | "no" | ""
  >("");

  // Additional Section 24 fields required by the PHP participant allowlist.
  const [consentGiven, setConsentGiven] = useState(false);
  const [consentName, setConsentName] = useState("");

  const [understanding, setUnderstanding] = useState(Boolean(understandingProp));
  const [communicationUsed, setCommunicationUsed] = useState(Boolean(communicationUsedProp));
  const [communicationDeclined, setCommunicationDeclined] = useState(Boolean(communicationDeclinedProp));
  const [communicationNotRequired, setCommunicationNotRequired] =
    useState(Boolean(communicationNotRequiredProp));
  const [independentAdvice, setIndependentAdvice] = useState(Boolean(independentAdviceProp));

  const [participantSigningName, setParticipantSigningName] = useState(participantSigningNameProp || "");
  const [participantSigningDate, setParticipantSigningDate] = useState(participantSigningDateProp || "");

  const [representativeName, setRepresentativeName] = useState(representativeNameProp || "");
  const [representativeDate, setRepresentativeDate] = useState(representativeDateProp || "");

  const [kaluraSigningName, setKaluraSigningName] = useState(kaluraSigningNameProp || "");
  const [kaluraSignature, setKaluraSignature] = useState(kaluraSignatureProp || "");
  const [kaluraDate, setKaluraDate] = useState(kaluraDateProp || "");

  const hasLoadedAgreement = useRef(false);
  const skipNextSave = useRef(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const statusTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [syncStatus, setSyncStatus] = useState<
    "idle" | "saving" | "updating" | "ready" | "failed"
  >("idle");
  const [syncMessage, setSyncMessage] = useState("");

  const API_BASE = "https://kalura.com.au/wp-json/kalura/v1/service-agreement";

  const getSavedValue = <T,>(
    data: Record<string, unknown>,
    key: string,
    fallback: T
  ): T => {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      return data[key] as T;
    }

    const lowerKey = key.toLowerCase();

    if (Object.prototype.hasOwnProperty.call(data, lowerKey)) {
      return data[lowerKey] as T;
    }

    return fallback;
  };

  // Both the HubSpot editor and the participant use the same complete
  // Service Agreement record. The only difference is the REST route used:
  // /editor for the embedded HubSpot editor and /participant for the
  // participant-facing quote. Every rendered input is backed by React state.
  const isParticipantMode = !isInEditor;
  const DATA_ENDPOINT = isParticipantMode ? `${API_BASE}/${quoteId}/participant` : `${API_BASE}/${quoteId}/editor`;

  useEffect(() => {
    if (!quoteId || isQuoteBlueprint || isInPreviewer) return;

    let cancelled = false;

    async function loadAgreement() {
      try {
        const response = await fetch(DATA_ENDPOINT, { cache: "no-store" });
        if (!response.ok) {
          const errorResult = await response.json().catch(() => null);
          throw new Error(errorResult?.message || `HTTP ${response.status}`);
        }

        const result = await response.json();
        if (cancelled) return;

        const data = (result?.data || {}) as Record<string, unknown>;

        setAgreementHeading(getSavedValue(data, "heading", heading || "SERVICE AGREEMENT"));
        setFullName(getSavedValue(data, "participantFullName", participantFullName || ""));
        setDateOfBirth(getSavedValue(data, "participantDateOfBirth", participantDateOfBirth || ""));
        setAddress(getSavedValue(data, "participantAddress", participantAddress || ""));
        setSuburb(getSavedValue(data, "participantSuburb", participantSuburb || ""));
        setState(getSavedValue(data, "participantState", participantState || ""));
        setPostcode(getSavedValue(data, "participantPostcode", participantPostcode || ""));
        setNdisNumberValue(getSavedValue(data, "ndisNumber", ndisNumber || ""));
        setNdisStartDate(getSavedValue(data, "ndisPlanStartDate", ndisPlanStartDate || ""));
        setNdisEndDate(getSavedValue(data, "ndisPlanEndDate", ndisPlanEndDate || ""));
        setStartDate(getSavedValue(data, "agreementStartDate", agreementStartDate || ""));
        setEndDate(getSavedValue(data, "agreementEndDate", agreementEndDate || ""));
        setPlanManagement(getSavedValue(data, "planManagement", planManagementProp || ""));
        setNdisPlanAttached(Boolean(getSavedValue(data, "ndisPlanAttached", ndisPlanAttachedProp)));
        setNdisPlanNotShared(Boolean(getSavedValue(data, "ndisPlanNotShared", ndisPlanNotSharedProp)));
        setClaimNonFace(getSavedValue(data, "claimNonFace", claimNonFaceProp || ""));
        setClaimTravelLabour(getSavedValue(data, "claimTravelLabour", claimTravelLabourProp || ""));
        setClaimTravelNonLabour(getSavedValue(data, "claimTravelNonLabour", claimTravelNonLabourProp || ""));
        setClaimCancellation(getSavedValue(data, "claimCancellation", claimCancellationProp || ""));
        setClaimReports(getSavedValue(data, "claimReports", claimReportsProp || ""));
        setConditions(getSavedValue(data, "conditions", conditionsProp || ""));
        setConditionReasons(getSavedValue(data, "conditionReasons", conditionReasonsProp || ""));
        setFundingComponent(getSavedValue(data, "fundingComponent", fundingComponentProp || ""));
        setFundingDates(getSavedValue(data, "fundingDates", fundingDatesProp || ""));
        setFundingNotes(getSavedValue(data, "fundingNotes", fundingNotesProp || ""));
        setSupportItem1(getSavedValue(data, "supportItem1", supportItem1Prop || ""));
        setSupportDescription1(getSavedValue(data, "supportDescription1", supportDescription1Prop || ""));
        setSupportPrice1(getSavedValue(data, "supportPrice1", supportPrice1Prop || ""));
        setSupportDelivery1(getSavedValue(data, "supportDelivery1", supportDelivery1Prop || ""));
        setSupportItem2(getSavedValue(data, "supportItem2", supportItem2Prop || ""));
        setSupportDescription2(getSavedValue(data, "supportDescription2", supportDescription2Prop || ""));
        setSupportPrice2(getSavedValue(data, "supportPrice2", supportPrice2Prop || ""));
        setSupportDelivery2(getSavedValue(data, "supportDelivery2", supportDelivery2Prop || ""));
        setSupportItem3(getSavedValue(data, "supportItem3", supportItem3Prop || ""));
        setSupportDescription3(getSavedValue(data, "supportDescription3", supportDescription3Prop || ""));
        setSupportPrice3(getSavedValue(data, "supportPrice3", supportPrice3Prop || ""));
        setSupportDelivery3(getSavedValue(data, "supportDelivery3", supportDelivery3Prop || ""));
        setConsentPersonalInfo(getSavedValue(data, "consentPersonalInfo", ""));
        setConsentProviders(getSavedValue(data, "consentProviders", ""));
        setConsentResearch(getSavedValue(data, "consentResearch", ""));
        setConsentNdisPortal(getSavedValue(data, "consentNdisPortal", ""));
        setConsentNdisPlan(getSavedValue(data, "consentNdisPlan", ""));
        setConsentNdisPortion(getSavedValue(data, "consentNdisPortion", ""));
        setPhotoService(getSavedValue(data, "photoService", ""));
        setPhotoMarketing(getSavedValue(data, "photoMarketing", ""));
        setPhotoPublications(getSavedValue(data, "photoPublications", ""));
        setNewsletter(getSavedValue(data, "newsletter", ""));
        setServiceOpportunities(getSavedValue(data, "serviceOpportunities", ""));
        setConsentGiven(Boolean(getSavedValue(data, "consentgiven", false)));
        setConsentName(getSavedValue(data, "consentname", ""));
        setUnderstanding(Boolean(getSavedValue(data, "understanding", understandingProp)));
        setCommunicationUsed(Boolean(getSavedValue(data, "communicationUsed", communicationUsedProp)));
        setCommunicationDeclined(Boolean(getSavedValue(data, "communicationDeclined", communicationDeclinedProp)));
        setCommunicationNotRequired(Boolean(getSavedValue(data, "communicationNotRequired", communicationNotRequiredProp)));
        setIndependentAdvice(Boolean(getSavedValue(data, "independentAdvice", independentAdviceProp)));
        setParticipantSigningName(getSavedValue(data, "participantSigningName", participantSigningNameProp || ""));
        setParticipantSigningDate(getSavedValue(data, "participantSigningDate", participantSigningDateProp || ""));
        setRepresentativeName(getSavedValue(data, "representativeName", representativeNameProp || ""));
        setRepresentativeDate(getSavedValue(data, "representativeDate", representativeDateProp || ""));
        setKaluraSigningName(getSavedValue(data, "kaluraSigningName", kaluraSigningNameProp || ""));
        setKaluraSignature(getSavedValue(data, "kaluraSignature", kaluraSignatureProp || ""));
        setKaluraDate(getSavedValue(data, "kaluraDate", kaluraDateProp || ""));

        hasLoadedAgreement.current = true;
        skipNextSave.current = true;
        setSyncStatus("ready");
        setSyncMessage(isParticipantMode ? "Ready for editing and signing" : "Editor changes are saved automatically");
      } catch (error) {
        console.error("Kalura Service Agreement load error:", error);
        hasLoadedAgreement.current = true;
        setSyncStatus("failed");
        setSyncMessage("Unable to load saved agreement data.");
      }
    }

    loadAgreement();
    return () => { cancelled = true; };
  }, [quoteId, isQuoteBlueprint, isInPreviewer, isInEditor]);

  useEffect(() => {
    if (!quoteId || isQuoteBlueprint || isInPreviewer || !hasLoadedAgreement.current) return;

    if (skipNextSave.current) {
      skipNextSave.current = false;
      return;
    }

    if (saveTimer.current) clearTimeout(saveTimer.current);

    const agreementData = {
      heading: agreementHeading || "SERVICE AGREEMENT",
      participantFullName: fullName,
      participantDateOfBirth: dateOfBirth,
      participantAddress: address,
      participantSuburb: suburb,
      participantState: state,
      participantPostcode: postcode,
      ndisNumber: ndisNumberValue,
      ndisPlanStartDate: ndisStartDate,
      ndisPlanEndDate: ndisEndDate,
      agreementStartDate: startDate,
      agreementEndDate: endDate,
      agreementIntro: agreementIntro || "",
      planManagement,
      ndisPlanAttached,
      ndisPlanNotShared,
      claimNonFace,
      claimTravelLabour,
      claimTravelNonLabour,
      claimCancellation,
      claimReports,
      conditions,
      conditionReasons,
      fundingComponent,
      fundingDates,
      fundingNotes,
      supportItem1,
      supportDescription1,
      supportPrice1,
      supportDelivery1,
      supportItem2,
      supportDescription2,
      supportPrice2,
      supportDelivery2,
      supportItem3,
      supportDescription3,
      supportPrice3,
      supportDelivery3,
      consentPersonalInfo,
      consentProviders,
      consentResearch,
      consentNdisPortal,
      consentNdisPlan,
      consentNdisPortion,
      photoService,
      photoMarketing,
      photoPublications,
      newsletter,
      serviceOpportunities,
      consentgiven: consentGiven,
      consentname: consentName,
      understanding,
      communicationUsed,
      communicationDeclined,
      communicationNotRequired,
      independentAdvice,
      participantSigningName,
      participantSigningDate,
      representativeName,
      representativeDate,
      kaluraSigningName,
      kaluraSignature,
      kaluraDate,
    };

    saveTimer.current = setTimeout(async () => {
      try {
        setSyncStatus("saving");
        setSyncMessage(isParticipantMode ? "Saving your changes..." : "Saving editor changes...");

        const response = await fetch(DATA_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(agreementData),
        });
        const result = await response.json().catch(() => null);
        if (!response.ok) throw new Error(result?.message || `HTTP ${response.status}`);

        if (!isParticipantMode) {
          setSyncStatus("ready");
          setSyncMessage("✓ Editor changes saved");
          return;
        }

        const republishStatus = result?.republish?.status;
        if (republishStatus === "completed") {
          setSyncStatus("ready");
          setSyncMessage("✓ Updated and ready for signing");
          return;
        }

        setSyncStatus("updating");
        setSyncMessage("Changes saved. Updating the signing document...");

        const pollStatus = async () => {
          try {
            const statusResponse = await fetch(`${API_BASE}/${quoteId}/republish-status`, { cache: "no-store" });
            const statusResult = await statusResponse.json().catch(() => null);
            if (!statusResponse.ok) throw new Error(statusResult?.message || `HTTP ${statusResponse.status}`);

            const status = statusResult?.republish?.status;
            const message = statusResult?.republish?.message;
            if (status === "completed") {
              setSyncStatus("ready");
              setSyncMessage("✓ Updated and ready for signing");
              return;
            }
            if (status === "failed") {
              setSyncStatus("failed");
              setSyncMessage(message || "The signing document could not be updated. Please contact KALURA.");
              return;
            }
            setSyncStatus("updating");
            setSyncMessage(message || "Updating the signing document...");
            statusTimer.current = setTimeout(pollStatus, 3000);
          } catch (pollError) {
            console.error("Kalura Service Agreement republish status error:", pollError);
            setSyncStatus("failed");
            setSyncMessage("We could not confirm the signing document update. Please wait and try again.");
          }
        };
        pollStatus();
      } catch (error) {
        console.error("Kalura Service Agreement save error:", error);
        setSyncStatus("failed");
        setSyncMessage(isParticipantMode ? "Unable to save your changes. Please try again." : "Unable to save editor changes.");
      }
    }, isParticipantMode ? 800 : 600);

    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
      if (statusTimer.current) clearTimeout(statusTimer.current);
    };
  }, [
    quoteId, isQuoteBlueprint, isInPreviewer, isInEditor,
    agreementHeading, fullName, dateOfBirth, address, suburb, state, postcode,
    ndisNumberValue, ndisStartDate, ndisEndDate, startDate, endDate, agreementIntro,
    planManagement, ndisPlanAttached, ndisPlanNotShared,
    claimNonFace, claimTravelLabour, claimTravelNonLabour, claimCancellation, claimReports,
    conditions, conditionReasons, fundingComponent, fundingDates, fundingNotes,
    supportItem1, supportDescription1, supportPrice1, supportDelivery1,
    supportItem2, supportDescription2, supportPrice2, supportDelivery2,
    supportItem3, supportDescription3, supportPrice3, supportDelivery3,
    consentPersonalInfo, consentProviders, consentResearch, consentNdisPortal,
    consentNdisPlan, consentNdisPortion, photoService, photoMarketing, photoPublications,
    newsletter, serviceOpportunities, consentGiven, consentName,
    understanding, communicationUsed, communicationDeclined, communicationNotRequired,
    independentAdvice, participantSigningName, participantSigningDate,
    representativeName, representativeDate, kaluraSigningName, kaluraSignature, kaluraDate,
  ]);


  return (
    <div className={styles.document}>
      {/* ================================================================
          1. PARTIES TO THIS AGREEMENT
          ================================================================ */}

      <h1 className={styles.mainTitle}>{agreementHeading || "SERVICE AGREEMENT"}</h1>

      {quoteId && !isQuoteBlueprint && !isInPreviewer && (
        <div
          role="status"
          aria-live="polite"
          style={{
            margin: "0 0 18px",
            padding: "10px 14px",
            border: "1px solid #d9e2e7",
            borderRadius: "6px",
            background: syncStatus === "failed" ? "#fff5f5" : "#f7fafb",
            color: syncStatus === "failed" ? "#a12626" : "#334155",
            fontSize: "14px",
            lineHeight: 1.45,
          }}
        >
          {syncMessage || "Ready"}
        </div>
      )}

      <div
        role="note"
        style={{
          margin: "0 0 18px",
          padding: "10px 14px",
          border: "1px solid #cbd5e1",
          borderRadius: "6px",
          background: "#f8fafc",
          color: "#334155",
          fontSize: "13px",
          lineHeight: 1.45,
        }}
      >
        <strong>{isInEditor ? "Editor mode:" : "Participant mode:"}</strong> The entire
        Service Agreement is editable. Changes are saved automatically.
      </div>

        <SectionHeading>1. PARTIES TO THIS AGREEMENT</SectionHeading>

      <p className={styles.bodyText}>
        This Service Agreement (Agreement) is made between the parties below for
        the purpose of providing supports under the Participant’s NDIS plan.
      </p>

      <SubHeading>Provider</SubHeading>

      <table className={styles.infoTable}>
        <tbody>
          <tr>
            <th>Provider name</th>
            <td>KALURA</td>
          </tr>
          <tr>
            <th>ABN</th>
            <td>37 699 864 367</td>
          </tr>
          <tr>
            <th>ACN</th>
            <td>699 864 367</td>
          </tr>
          <tr>
            <th>Address</th>
            <td>29 Billarga Road, Westleigh, NSW 2120</td>
          </tr>
          <tr>
            <th>Phone number</th>
            <td>1300400206</td>
          </tr>
          <tr>
            <th>Email address</th>
            <td>admin@kalura.com.au</td>
          </tr>
          <tr>
            <th>Website</th>
            <td>https://www.kalura.com.au</td>
          </tr>
          <tr>
            <th>Contact person and position</th>
            <td>Maria Babiera – Chief Operating Officer</td>
          </tr>
        </tbody>
      </table>

      <SubHeading>Participant</SubHeading>

      <table className={styles.infoTable}>
        <tbody>
          <tr>
            <th>Full name</th>
            <td>
              <TextInput value={fullName} onChange={setFullName} />
            </td>
          </tr>

          <tr>
            <th>Date of birth</th>
            <td>
              <TextInput
                value={dateOfBirth}
                onChange={setDateOfBirth}
                placeholder="DD/MM/YYYY"
              />
            </td>
          </tr>

          <tr>
            <th>Address</th>
            <td>
              <TextInput value={address} onChange={setAddress} />
            </td>
          </tr>

          <tr>
            <th>Suburb, state and postcode</th>
            <td>
              <div className={styles.addressLine}>
                <TextInput value={suburb} onChange={setSuburb} />
                <TextInput value={state} onChange={setState} />
                <input
                  className={styles.postcodeInput}
                  value={postcode}
                  onChange={(event) => setPostcode(event.target.value)}
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <SubHeading>NDIS plan details</SubHeading>

      <table className={styles.infoTable}>
        <tbody>
          <tr>
            <th>NDIS number</th>
            <td>
              <TextInput
                value={ndisNumberValue}
                onChange={setNdisNumberValue}
              />
            </td>
          </tr>

          <tr>
            <th>NDIS plan start date</th>
            <td>
              <TextInput
                value={ndisStartDate}
                onChange={setNdisStartDate}
                placeholder="DD/MM/YYYY"
              />
            </td>
          </tr>

          <tr>
            <th>NDIS plan end date</th>
            <td>
              <TextInput
                value={ndisEndDate}
                onChange={setNdisEndDate}
                placeholder="DD/MM/YYYY"
              />
            </td>
          </tr>

          <tr>
            <th>Plan management type</th>
            <td className={styles.planOptions}>
              <label>
                <input
                  type="radio"
                  name="planManagement"
                  checked={planManagement === "self"}
                  onChange={() => setPlanManagement("self")}
                />
                Self-Managed
              </label>

              <label>
                <input
                  type="radio"
                  name="planManagement"
                  checked={planManagement === "plan"}
                  onChange={() => setPlanManagement("plan")}
                />
                Plan-Managed
              </label>

              <label>
                <input
                  type="radio"
                  name="planManagement"
                  checked={planManagement === "ndia"}
                  onChange={() => setPlanManagement("ndia")}
                />
                NDIA-Managed
              </label>
            </td>
          </tr>
        </tbody>
      </table>

      {/* ================================================================
          PERIOD OF AGREEMENT
          ================================================================ */}

      <SubHeading>Period of this Agreement</SubHeading>

      <table className={styles.infoTable}>
        <tbody>
          <tr>
            <th>Start Date</th>
            <td>
              <TextInput
                value={startDate}
                onChange={setStartDate}
                placeholder="DD/MM/YYYY"
              />
            </td>
          </tr>

          <tr>
            <th>End Date</th>
            <td>
              <TextInput
                value={endDate}
                onChange={setEndDate}
                placeholder="DD/MM/YYYY"
              />
            </td>
          </tr>

          <tr>
            <td colSpan={2}>
              <CheckboxRow
                checked={ndisPlanAttached}
                onChange={setNdisPlanAttached}
              >
                A copy of the Participant’s NDIS plan (or the relevant parts) is
                attached to this Agreement.
              </CheckboxRow>

              <CheckboxRow
                checked={ndisPlanNotShared}
                onChange={setNdisPlanNotShared}
              >
                The Participant has chosen not to share their NDIS plan.
              </CheckboxRow>
            </td>
          </tr>
        </tbody>
      </table>

      {/* ================================================================
          2. ABOUT THIS AGREEMENT AND THE NDIS
          ================================================================ */}

      <SectionHeading>2. ABOUT THIS AGREEMENT AND THE NDIS</SectionHeading>

      <div className={styles.bodyText}>
        <p>
          This Agreement is a formal agreement between KALURA and the
          Participant. It records the supports the Participant has chosen, how
          and when they will be provided, and the prices that apply. It helps to
          make sure there is a shared understanding of:
        </p>

        <BulletList>
          <li>
            what supports will be delivered and how, when and where they will be
            delivered;
          </li>
          <li>the prices of those supports and how they will be paid;</li>
          <li>how long this Agreement lasts and how it will be reviewed;</li>
          <li>the responsibilities of KALURA and the Participant;</li>
          <li>how to change or end this Agreement; and</li>
          <li>how any problems will be handled.</li>
        </BulletList>

        <p>
          This Agreement was developed together with the Participant and, where
          applicable, the Participant’s Representative, so that it reflects the
          Participant’s choices, goals and needs.
        </p>

        <p>
          The parties agree that this Agreement is made in the context of the
          NDIS, a scheme that aims to:
        </p>

        <BulletList>
          <li>
            support the independence and social and economic participation of
            people with disability; and
          </li>
          <li>
            enable people with disability to exercise choice and control in the
            pursuit of their goals and the planning and delivery of their
            supports.
          </li>
        </BulletList>

        <p>
          KALURA will not seek to impose any condition on the Participant
          through this Agreement that is not in line with the NDIS Pricing
          Arrangements. Any condition of this Agreement that is inconsistent
          with the NDIS Pricing Arrangements does not apply, to the extent of
          the inconsistency.
        </p>

        <p>
          Any conditions attached to the delivery of particular supports, and
          the reasons those conditions are attached, are set out in the Schedule
          of Supports.
        </p>
      </div>

      {/* ================================================================
          3. DEFINITIONS
          ================================================================ */}

      <SectionHeading>3. DEFINITIONS</SectionHeading>

      <p className={styles.bodyText}>In this Agreement:</p>

      <table className={styles.definitionsTable}>
        <tbody>
          <tr>
            <th>Agreement</th>
            <td>
              means this Service Agreement, including the Schedule of Supports,
              the Participant Consent schedule and any written variations agreed
              by the parties.
            </td>
          </tr>

          <tr>
            <th>Business Day</th>
            <td>
              means a day that is not a Saturday, Sunday or a public holiday in
              the state or territory where supports are delivered.
            </td>
          </tr>

          <tr>
            <th>Emergency or Disaster Event</th>
            <td>
              means an event beyond the reasonable control of either party that
              affects the delivery of supports, such as a natural disaster (for
              example flood, storm, fire or earthquake), an epidemic or
              pandemic, a public health direction, an extended infrastructure or
              utility outage, or industrial disputation.
            </td>
          </tr>

          <tr>
            <th>Funding Period</th>
            <td>
              means a period during which part of the funding in the
              Participant’s NDIS plan is made available, as set out in the plan.
            </td>
          </tr>

          <tr>
            <th>GST Law</th>
            <td>
              means A New Tax System (Goods and Services Tax) Act 1999 (Cth) and
              related legislation, as amended from time to time.
            </td>
          </tr>

          <tr>
            <th>Incident</th>
            <td>
              means an act, omission, event or circumstance that occurs in
              connection with providing supports to the Participant and that
              has, or could have, caused harm to the Participant or another
              person with disability.
            </td>
          </tr>

          <tr>
            <th>NDIA</th>
            <td>
              means the National Disability Insurance Agency, the Commonwealth
              agency that administers the NDIS.
            </td>
          </tr>

          <tr>
            <th>NDIS</th>
            <td>means the National Disability Insurance Scheme.</td>
          </tr>

          <tr>
            <th>NDIS Act</th>
            <td>
              means the National Disability Insurance Scheme Act 2013 (Cth).
            </td>
          </tr>

          <tr>
            <th>NDIS Commission</th>
            <td>
              means the NDIS Quality and Safeguards Commission, the independent
              commission that regulates NDIS providers.
            </td>
          </tr>

          <tr>
            <th>NDIS plan</th>
            <td>
              means the plan approved for the Participant under the NDIS Act
              that sets out the Participant’s goals and the supports funded for
              the Participant.
            </td>
          </tr>

          <tr>
            <th>NDIS Pricing Arrangements</th>
            <td>
              means the pricing documents published by the NDIA on the NDIS
              website, as updated from time to time, including the NDIS Pricing
              Schedule and the NDIS support catalogue for the relevant year and
              any pricing arrangements, price limits, claiming rules or pricing
              determination that applies to supports delivered under this
              Agreement.
            </td>
          </tr>

          <tr>
            <th>Participant</th>
            <td>
              means the person receiving supports from KALURA under this
              Agreement, named in the Parties to this Agreement section.
            </td>
          </tr>

          <tr>
            <th>Participant’s Representative</th>
            <td>
              means a person who has authority to act on behalf of the
              Participant, such as a parent, guardian or nominee, named in the
              Parties to this Agreement section.
            </td>
          </tr>

          <tr>
            <th>Schedule of Supports</th>
            <td>
              means the schedule at the end of this Agreement that lists the
              supports, prices and delivery arrangements agreed by the parties.
            </td>
          </tr>

          <tr>
            <th>Short Notice Cancellation</th>
            <td>
              means a cancellation or a failure to attend a scheduled support as
              described in the Short Notice Cancellations section of this
              Agreement.
            </td>
          </tr>

          <tr>
            <th>Supports</th>
            <td>
              means the supports and services that KALURA has agreed to provide
              to the Participant, as set out in the Schedule of Supports.
            </td>
          </tr>

          <tr>
            <th>Worker</th>
            <td>
              means an individual engaged by KALURA (as an employee, contractor
              or volunteer) to deliver the Supports.
            </td>
          </tr>
        </tbody>
      </table>

      {/* ================================================================
          4. COMMENCEMENT, DURATION AND REVIEW
          ================================================================ */}

      <SectionHeading>4. COMMENCEMENT, DURATION AND REVIEW</SectionHeading>

      <SubHeading>Commencement and duration</SubHeading>

      <p className={styles.bodyText}>
        This Agreement starts on the Start Date and continues until the End Date
        set out in the Parties to this Agreement section, unless it is ended
        earlier under the Ending this Agreement section.
      </p>

      <SubHeading>Review</SubHeading>

      <p className={styles.bodyText}>
        KALURA will review this Agreement with the Participant at least every 12
        months, before the End Date, and at any time at the Participant’s
        request, to make sure it continues to meet the Participant’s needs.
      </p>

      <SubHeading>Changes to the Participant’s NDIS plan</SubHeading>

      <p className={styles.bodyText}>
        If the Participant’s NDIS plan is reassessed, replaced, extended or
        ends, KALURA will discuss with the Participant how supports will
        continue. Where a new NDIS plan is issued, KALURA will review this
        Agreement with the Participant and agree any updates to the Schedule of
        Supports. Supports can continue while a new plan is being put in place,
        provided funding is available for them.
      </p>

      <SubHeading>Extension</SubHeading>

      <p className={styles.bodyText}>
        This Agreement may be extended if both parties agree in writing before
        the End Date. An extension is recorded as a written variation under the
        Changing this Agreement section.
      </p>

      {/* ================================================================
          5. SUPPORTS AND PRICES
          ================================================================ */}

      <SectionHeading>5. SUPPORTS AND PRICES</SectionHeading>

      <p className={styles.bodyText}>
        From the Start Date, KALURA will deliver the Supports set out in the
        Schedule of Supports. KALURA will invoice or claim payment from the
        NDIA, the Participant or the Participant’s plan manager (as applicable)
        at the prices set out in the Schedule of Supports.
      </p>

      <p className={styles.bodyText}>
        Prices will not exceed the maximum prices that the NDIS Pricing
        Arrangements set for a support item.
      </p>

      <p className={styles.bodyText}>
        The NDIA updates its pricing documents from time to time. If a price
        under this Agreement needs to change, KALURA will discuss the proposed
        change with the Participant, provide an updated Schedule of Supports,
        and apply the new price only once the Participant has agreed. Prices
        will always remain within the current NDIA maximum prices.
      </p>

      <p className={styles.bodyText}>
        KALURA will not add any other charge to the cost of the Supports, such
        as gap fees, credit card surcharges or other additional fees.
      </p>

      <p className={styles.bodyText}>
        The Supports do not cover personal expenses such as meals, entrance fees
        or tickets. These remain the Participant’s responsibility. Any items or
        costs not covered by this Agreement are listed in the Schedule of
        Supports.
      </p>

      <p className={styles.bodyText}>
        If changes to the Supports or their delivery are needed, the parties
        will discuss and review this Agreement together. Any change to the
        Schedule of Supports will be recorded in writing, signed and dated by
        both parties.
      </p>

      {/* ================================================================
          6. CLAIMING FOR NON-FACE-TO-FACE SUPPORTS
          ================================================================ */}

      <SectionHeading>6. CLAIMING FOR NON-FACE-TO-FACE SUPPORTS</SectionHeading>

      <p className={styles.bodyText}>
        KALURA may claim from the Participant’s plan for non-face-to-face
        delivery of a support item only if all of the following conditions are
        met:
      </p>

      <BulletList>
        <li>
          the NDIS Pricing Arrangements allow non-face-to-face claiming for that
          support item;
        </li>
        <li>
          the proposed charges comply with the NDIS Pricing Arrangements and
          with this Agreement;
        </li>
        <li>
          the activity directly relates to delivering a specific support to the
          Participant (not general activities such as enrolment, administration
          or staff rostering);
        </li>
        <li>
          KALURA has explained the activity to the Participant, including why it
          represents the best use of the Participant’s funds; and
        </li>
        <li>
          the Participant has agreed in advance, as recorded in the Schedule of
          Supports.
        </li>
      </BulletList>

      <p className={styles.bodyText}>
        KALURA will not claim as non-face-to-face supports any administrative
        activity that is covered by the overhead component of NDIS prices, such
        as developing or agreeing service agreements, entering participant
        details into systems, making service arrangements or processing payment
        claims.
      </p>

      {/* ================================================================
          7. CLAIMING FOR PROVIDER TRAVEL
          ================================================================ */}

      <SectionHeading>7. CLAIMING FOR PROVIDER TRAVEL</SectionHeading>

      <p className={styles.bodyText}>
        KALURA may claim travel costs from the Participant’s plan in relation to
        a support item only if all of the following conditions are met:
      </p>

      <BulletList>
        <li>
          the NDIS Pricing Arrangements allow travel claiming for that support
          item;
        </li>
        <li>the travel charges comply with the NDIS Pricing Arrangements;</li>
        <li>
          the travel is part of delivering a specific support to the
          Participant, and the support is delivered face-to-face;
        </li>
        <li>
          KALURA has explained the travel costs to the Participant, including
          why they represent the best use of the Participant’s funds;
        </li>
        <li>
          the Participant has agreed to the travel costs in advance, as recorded
          in the Schedule of Supports; and
        </li>
        <li>KALURA is required to pay the Worker for the travel time.</li>
      </BulletList>

      <SubHeading>Travel time</SubHeading>

      <p className={styles.bodyText}>
        For travel to and from the place where a support is delivered, KALURA
        may claim up to the maximum travel time that the NDIS Pricing
        Arrangements allow. This is currently up to 30 minutes each way in
        metropolitan areas (Modified Monash Model classification MMM1 to MMM3)
        and up to 60 minutes each way in regional areas (MMM4 and MMM5), based
        on the location where the support is delivered.
      </p>

      <SubHeading>Non-labour travel costs</SubHeading>

      <p className={styles.bodyText}>
        If KALURA incurs other costs when travelling to deliver face-to-face
        supports, the Participant agrees to contribute as recorded in the
        Schedule of Supports, up to the maximums in the NDIS Pricing
        Arrangements. These maximums are currently up to $0.99 per kilometre for
        a vehicle that is not modified for accessibility, and up to the full
        amount of other costs such as road tolls, parking and public transport
        fares.
      </p>

      <p className={styles.bodyText}>
        KALURA will not claim for travel where the price of the support already
        includes travel costs.
      </p>

      {/* ================================================================
          8. SHORT NOTICE CANCELLATIONS
          ================================================================ */}

      <SectionHeading>8. SHORT NOTICE CANCELLATIONS</SectionHeading>

      <p className={styles.bodyText}>
        A Short Notice Cancellation happens when:
      </p>

      <BulletList>
        <li>
          the Participant cancels a support delivered by a disability support
          worker with less than seven (7) days’ notice;
        </li>
        <li>
          the Participant cancels any other support with less than two (2) clear
          Business Days’ notice; or
        </li>
        <li>
          the Participant does not attend a scheduled support within a
          reasonable time, or is not present at the agreed place within a
          reasonable time when KALURA travels to deliver the support.
        </li>
      </BulletList>

      <p className={styles.bodyText}>
        If the NDIS Pricing Arrangements set different notice periods, those
        periods apply instead.
      </p>

      <p className={styles.bodyText}>
        For a Short Notice Cancellation, KALURA may claim up to 100% of the
        agreed price for the cancelled support from the Participant’s plan, but
        only if all of the following conditions are met:
      </p>

      <BulletList>
        <li>
          the NDIS Pricing Arrangements allow cancellation claiming for that
          support item;
        </li>
        <li>
          these cancellation terms have been explained to and agreed with the
          Participant, as recorded in the Schedule of Supports; and
        </li>
        <li>
          KALURA was not able to find other billable work for the Worker and is
          required to pay the Worker for the time that would have been spent
          providing the support.
        </li>
      </BulletList>

      <p className={styles.bodyText}>
        KALURA may choose to waive a cancellation fee, particularly where the
        Participant’s circumstances warrant it.
      </p>

      <p className={styles.bodyText}>
        Cancellations should be advised as early as possible by email to
        admin@kalura.com.au or by phone on 1300400206.
      </p>

      <SubHeading>Group supports</SubHeading>

      <p className={styles.bodyText}>
        If the Participant cancels attendance at a group session at short notice
        and KALURA cannot find another participant to take their place, KALURA
        may, if the other conditions above are met, bill the Participant at the
        agreed rate as though they had attended. Other participants in the group
        are billed as though all participants attended.
      </p>

      <p className={styles.bodyText}>
        There is no fixed limit on cancellation claims, but KALURA has a duty of
        care to the Participant. If cancellations happen often, KALURA will talk
        with the Participant to understand why, and whether the Supports still
        meet the Participant’s needs. The NDIA monitors cancellation claims.
      </p>

      {/* ================================================================
          9. NDIA REQUESTED REPORTS
          ================================================================ */}

      <SectionHeading>9. NDIA REQUESTED REPORTS</SectionHeading>

      <p className={styles.bodyText}>
        KALURA may claim from the Participant’s plan for preparing a report
        requested by the NDIA only if the NDIS Pricing Arrangements allow report
        claiming for that support item and the Participant has agreed in
        advance, as recorded in the Schedule of Supports.
      </p>

      <p className={styles.bodyText}>
        A report is considered to be requested by the NDIA if it is required at
        the start of a plan to outline objectives and goals, at a plan
        reassessment to measure outcomes against those goals, or to make
        recommendations about ongoing needs, or if it is another report
        stipulated as required in the Participant’s plan.
      </p>

      <p className={styles.bodyText}>
        For each report, KALURA will allocate up to 3 hours of preparation time,
        billed at the relevant hourly rate in the Schedule of Supports.
      </p>

      {/* ================================================================
          10. RESPONSIBILITIES OF THE PARTICIPANT
          ================================================================ */}

      <SectionHeading>10. RESPONSIBILITIES OF THE PARTICIPANT</SectionHeading>

      <p className={styles.bodyText}>
        The Participant (and, where applicable, the Participant’s
        Representative) agrees to:
      </p>

      <BulletList>
        <li>
          work with KALURA to make sure the Supports meet the Participant’s
          needs, and share their preferences for how the Supports are delivered;
        </li>
        <li>treat Workers with courtesy and respect;</li>
        <li>
          tell KALURA about anything that changes the Participant’s support
          needs or circumstances, including changes to personal or contact
          details;
        </li>
        <li>
          tell KALURA if the Participant’s NDIS plan is suspended, replaced or
          ends, or if the Participant stops being an NDIS participant;
        </li>
        <li>
          tell KALURA about other providers delivering supports to the
          Participant, where this is relevant to delivering the Supports safely;
        </li>
        <li>
          provide a safe, smoke-free environment for Workers when Supports are
          delivered at the Participant’s home, and tell KALURA about any risks
          or hazards;
        </li>
        <li>
          before in-person supports, tell KALURA if the Participant or a
          household member is unwell with an infectious illness or is required
          to isolate, so that alternative delivery arrangements can be
          discussed;
        </li>
        <li>
          make sure enough funding is available for the Supports booked, and pay
          any invoices the Participant is responsible for in line with the
          Payments section;
        </li>
        <li>
          give notice in line with the Ending this Agreement section if the
          Participant wants to end this Agreement; and
        </li>
        <li>
          raise any concerns early, in line with the Feedback, Complaints and
          Disputes section.
        </li>
      </BulletList>

      {/* ================================================================
          11. RESPONSIBILITIES OF THE PROVIDER
          ================================================================ */}

      <SectionHeading>11. RESPONSIBILITIES OF THE PROVIDER</SectionHeading>

      <p className={styles.bodyText}>KALURA agrees to:</p>

      <BulletList>
        <li>
          deliver the Supports set out in the Schedule of Supports at the agreed
          times and places, and work with the Participant to deliver them in the
          way the Participant prefers;
        </li>
        <li>
          treat the Participant with courtesy and respect, and uphold the
          Participant’s dignity, privacy and right to make their own decisions;
        </li>
        <li>
          support the Participant to understand this Agreement using the
          language, mode of communication and terms that the Participant is most
          likely to understand, including through an interpreter, Easy Read
          material or an advocate where needed;
        </li>
        <li>
          involve the Participant in decisions about how the Supports are
          provided, and make reasonable efforts to involve the Participant in
          selecting their Workers, including the preferred gender of Workers
          providing personal care supports;
        </li>
        <li>
          deliver the Supports in line with the NDIS Act and rules, the NDIS
          Practice Standards, the NDIS Code of Conduct and the Australian
          Consumer Law;
        </li>
        <li>
          make sure Workers hold the required qualifications, screening checks
          and training;
        </li>
        <li>
          review the Supports regularly with the Participant, and adjust them as
          the Participant’s needs change;
        </li>
        <li>
          keep accurate records of the Supports provided, and issue itemised
          invoices or statements;
        </li>
        <li>
          protect the Participant’s personal information in line with the
          Privacy and Personal Information section;
        </li>
        <li>
          manage incidents and complaints in line with the Incident Management
          Policy and Procedure and the Feedback and Complaints Management Policy
          and Procedure, and help the Participant access an advocate or other
          support to raise concerns; and
        </li>
        <li>
          give notice in line with the Ending this Agreement section if KALURA
          needs to end this Agreement.
        </li>
      </BulletList>

      {/* ================================================================
          12. PAYMENTS
          ================================================================ */}

      <SectionHeading>12. PAYMENTS</SectionHeading>

      <p className={styles.bodyText}>
        How payment works depends on how the Participant’s NDIS funding is
        managed, as recorded in the Parties to this Agreement section.
      </p>

      <SubHeading>NDIA-managed (agency-managed)</SubHeading>

      <p className={styles.bodyText}>
        After Supports are delivered, KALURA will claim payment directly from
        the NDIA.
      </p>

      <SubHeading>Plan-managed</SubHeading>

      <p className={styles.bodyText}>
        After Supports are delivered, KALURA will send invoices to the
        Participant’s registered plan management provider for payment.
      </p>

      <SubHeading>Self-managed</SubHeading>

      <p className={styles.bodyText}>
        After Supports are delivered, KALURA will issue the Participant an
        itemised invoice, listing each support in line with the Schedule of
        Supports. The Participant will pay the invoice within 7 days by
        electronic funds transfer to the account on the invoice. KALURA will
        issue a receipt for each payment.
      </p>

      <SubHeading>Funding Periods</SubHeading>

      <p className={styles.bodyText}>
        The Participant’s plan may make funding available in Funding Periods
        (usually three months). KALURA will only deliver and claim for Supports
        within the funding available for the current Funding Period, and will
        submit claims promptly after Supports are delivered.
      </p>

      <SubHeading>Difficulty paying</SubHeading>

      <p className={styles.bodyText}>
        If the Participant has difficulty paying, they (or their Representative)
        should contact the Chief Executive Officer as early as possible so a
        payment arrangement can be discussed.
      </p>

      <SubHeading>Unpaid invoices</SubHeading>

      <p className={styles.bodyText}>
        If invoices the Participant is responsible for remain unpaid, KALURA
        will first talk with the Participant to understand why and to agree a
        payment arrangement. KALURA may pause Supports because of non-payment
        only as a last resort, after giving written notice, and after
        considering the Participant’s safety and wellbeing.
      </p>

      {/* ================================================================
          13. GOODS AND SERVICES TAX
          ================================================================ */}

      <SectionHeading>13. GOODS AND SERVICES TAX</SectionHeading>

      <p className={styles.bodyText}>
        The parties acknowledge that a supply of Supports under this Agreement
        is GST-free where all of the following apply:
      </p>

      <BulletList>
        <li>the Participant has an NDIS plan in effect under the NDIS Act;</li>
        <li>
          the Supports are reasonable and necessary supports specified in the
          statement of supports in the Participant’s NDIS plan;
        </li>
        <li>
          the supply is made under this written agreement, which identifies the
          Participant and states that the supply is of reasonable and necessary
          supports specified in the statement of supports in the Participant’s
          NDIS plan; and
        </li>
        <li>
          the supply is of a kind covered by the A New Tax System (Goods and
          Services Tax) (GST-free Supply—National Disability Insurance Scheme
          Supports) Determination 2021.
        </li>
      </BulletList>

      <p className={styles.bodyText}>
        The parties confirm that this Agreement is an agreement of that kind.
        Where GST applies to a support, the price includes GST in line with the
        GST Law and the NDIS Pricing Arrangements.
      </p>

      {/* ================================================================
          14. EMERGENCY AND DISASTER ARRANGEMENTS
          ================================================================ */}

      <SectionHeading>14. EMERGENCY AND DISASTER ARRANGEMENTS</SectionHeading>

      <p className={styles.bodyText}>
        This section sets out the arrangements that apply to the Participant’s
        Supports if an Emergency or Disaster Event occurs.
      </p>

      <BulletList>
        <li>
          KALURA will contact the Participant as early as possible to discuss
          and agree any changes to the Supports before they are put in place,
          wherever this is possible;
        </li>
        <li>
          KALURA will prioritise Supports that are critical to the Participant’s
          safety, health and wellbeing, and will agree with the Participant
          which Supports must continue and which can be adjusted or paused;
        </li>
        <li>
          where face-to-face delivery is not possible or safe, KALURA will offer
          alternative arrangements where appropriate, such as phone or online
          delivery, changed locations or times, or a different Worker;
        </li>
        <li>
          KALURA will follow its Emergency and Disaster Management Policy and
          Procedure, including its plans for preparing for, responding to and
          recovering from emergencies; and
        </li>
        <li>
          where the Participant has a Personal Emergency Management Plan, KALURA
          will follow it, keep it up to date with the Participant, and make sure
          the Workers supporting the Participant understand it; and
        </li>
        <li>
          any arrangements specific to the Participant (for example priority
          supports, backup contacts or evacuation needs) are recorded in the
          Schedule of Supports and in the Participant’s Personal Emergency
          Management Plan.
        </li>
      </BulletList>

      <p className={styles.bodyText}>
        Neither party will be liable to the other for a failure to perform this
        Agreement caused by an Emergency or Disaster Event or another event
        beyond that party’s reasonable control. KALURA will keep working to
        restore the Supports as soon as practicable.
      </p>

      {/* ================================================================
          15. CONTINUITY OF SUPPORTS
          ================================================================ */}

      <SectionHeading>15. CONTINUITY OF SUPPORTS</SectionHeading>

      <p className={styles.bodyText}>
        KALURA will make arrangements to make sure the Participant’s Supports
        continue without interruption throughout the period of this Agreement,
        in line with the Continuity of Supports Policy and Procedure. This
        includes:
      </p>

      <BulletList>
        <li>
          arranging a suitably qualified and experienced replacement Worker if
          the Participant’s usual Worker is absent or a vacancy arises, taking
          the Participant’s needs and preferences into account;
        </li>
        <li>
          telling the Participant as early as possible about any change to a
          scheduled support; and
        </li>
        <li>
          with the Participant’s consent or direction, working with the
          Participant’s other providers to share information, manage risks and
          meet the Participant’s needs.
        </li>
      </BulletList>

      {/* ================================================================
          16. INCIDENT MANAGEMENT
          ================================================================ */}

      <SectionHeading>16. INCIDENT MANAGEMENT</SectionHeading>

      <p className={styles.bodyText}>
        KALURA will keep the Participant safe and will manage any Incident
        connected with the Supports in line with its Incident Management Policy
        and Procedure, including acknowledging, investigating, responding to and
        recording the Incident, and involving and supporting the Participant.
      </p>

      <p className={styles.bodyText}>
        KALURA encourages the Participant to report any Incident or safety
        concern promptly. Raising an Incident will never disadvantage the
        Participant or their Supports.
      </p>

      <p className={styles.bodyText}>
        Where an Incident is reportable under the NDIS Act and rules, KALURA
        will notify the NDIS Commission as required.
      </p>

      {/* ================================================================
          17. CHANGING THIS AGREEMENT
          ================================================================ */}

      <SectionHeading>17. CHANGING THIS AGREEMENT</SectionHeading>

      <p className={styles.bodyText}>
        KALURA will discuss any proposed change to this Agreement with the
        Participant, and a change takes effect only once the Participant has
        agreed to it. Changes are recorded in writing, signed and dated by both
        parties, including any updated Schedule of Supports.
      </p>

      <p className={styles.bodyText}>
        If either party wants to change the regular schedule of Supports (for
        example days or times), they should give the other party at least 2
        weeks’ notice. Urgent or special circumstances will be discussed case by
        case.
      </p>

      {/* ================================================================
          18. ENDING THIS AGREEMENT
          ================================================================ */}

      <SectionHeading>18. ENDING THIS AGREEMENT</SectionHeading>

      <p className={styles.bodyText}>
        Either party may end this Agreement by giving the other party at least 4
        weeks’ written notice.
      </p>

      <p className={styles.bodyText}>
        Either party may end this Agreement immediately if the other party
        seriously breaches it, or if continuing would put the safety of the
        Participant or a Worker at serious risk.
      </p>

      <p className={styles.bodyText}>
        If the Participant’s NDIS plan ends and is not replaced, this Agreement
        ends on the same date, and KALURA will support the Participant’s
        transition in line with the Continuity of Supports Policy and Procedure.
      </p>

      <p className={styles.bodyText}>
        This Agreement does not renew automatically. Before the End Date, KALURA
        will review this Agreement with the Participant and, if the Participant
        wishes to continue receiving Supports, the parties will agree a new or
        extended Agreement in writing.
      </p>

      <p className={styles.bodyText}>
        When this Agreement ends, KALURA may invoice or claim for Supports
        already delivered, and will handle the Participant’s records in line
        with the Privacy and Confidentiality Policy and Procedure. If the
        Participant moves to another provider, KALURA will support a safe and
        planned transition, with the Participant’s consent.
      </p>

      {/* ================================================================
          19. FEEDBACK, COMPLAINTS AND DISPUTES
          ================================================================ */}

      <SectionHeading>19. FEEDBACK, COMPLAINTS AND DISPUTES</SectionHeading>

      <p className={styles.bodyText}>
        KALURA welcomes feedback. If the Participant has a concern or complaint
        about this Agreement or the Supports, they can raise it with KALURA in
        any of the following ways, and it will be managed in line with the
        Feedback and Complaints Management Policy and Procedure:
      </p>

      <BulletList>
        <li>phone: 1300400206;</li>
        <li>email: admin@kalura.com.au; or</li>
        <li>mail: 29 Billarga Road, Westleigh, NSW 2120.</li>
      </BulletList>

      <p className={styles.bodyText}>
        Participants can also submit Feedback and Complaints through our website
        https://kalura.com.au/feedback-complaints. For added convenience, a
        Feedback and Complaints Form is also included in the onboarding Welcome
        Pack.
      </p>

      <p className={styles.bodyText}>
        The Participant can be supported by a family member, friend, advocate or
        interpreter at any stage, and KALURA can help arrange this. Making a
        complaint will never affect the Participant’s Supports or how they are
        treated.
      </p>

      <p className={styles.bodyText}>
        The Participant does not have to complain to KALURA first. A complaint
        about the quality or safety of supports can be made to the NDIS Quality
        and Safeguards Commission at any time:
      </p>

      <BulletList>
        <li>
          phone 1800 035 544 (free call from landlines), with interpreters
          available on request;
        </li>
        <li>
          TTY 133 677, or through the National Relay Service, asking for 1800
          035 544; or
        </li>
        <li>
          using the complaint contact form on the NDIS Commission website:
          www.ndiscommission.gov.au/complaints-form.
        </li>
      </BulletList>

      <p className={styles.bodyText}>
        For concerns about the Participant’s NDIS plan or funding, the
        Participant can contact the NDIA on 1800 800 110.
      </p>

      {/* ================================================================
          20. PRIVACY AND PERSONAL INFORMATION
          ================================================================ */}

      <SectionHeading>20. PRIVACY AND PERSONAL INFORMATION</SectionHeading>

      <p className={styles.bodyText}>
        KALURA collects the Participant’s personal information to provide the
        Supports, including for support planning, delivery, review and billing.
        KALURA handles personal information in line with the Privacy Act 1988
        (Cth), the Australian Privacy Principles and its Privacy and
        Confidentiality Policy and Procedure.
      </p>

      <p className={styles.bodyText}>
        KALURA will keep the Participant’s information accurate, secure,
        confidential and accessible to the Participant. KALURA discloses
        personal information only with the Participant’s consent (as recorded in
        the Participant Consent schedule), or where required or authorised by
        law, including to the NDIA, the NDIS Commission and approved quality
        auditors.
      </p>

      <p className={styles.bodyText}>
        The Participant can ask to access or correct the information KALURA
        holds about them at any time by contacting:
      </p>

      <BulletList>
        <li>phone: 1300400206;</li>
        <li>email: admin@kalura.com.au; or</li>
        <li>mail: 29 Billarga Road, Westleigh, NSW 2120.</li>
      </BulletList>

      {/* ================================================================
          21. YOUR RIGHTS WHEN ENTERING THIS AGREEMENT
          ================================================================ */}

      <SectionHeading>
        21. YOUR RIGHTS WHEN ENTERING THIS AGREEMENT
      </SectionHeading>

      <p className={styles.bodyText}>
        Entering this Agreement is voluntary. The Participant has the right to:
      </p>

      <BulletList>
        <li>
          take time to consider this Agreement before signing, and ask questions
          about anything that is unclear;
        </li>
        <li>
          get advice or support from a family member, friend, advocate or lawyer
          before signing, and to be supported by an advocate at any time;
        </li>
        <li>
          receive this Agreement explained in the language, mode of
          communication and terms they are most likely to understand, including
          Easy Read material or an interpreter on request;
        </li>
        <li>
          choose not to share their NDIS plan (or to share only the parts they
          choose);
        </li>
        <li>
          talk about this Agreement with anyone they trust, including an
          advocate, the NDIA or the NDIS Commission, at any time; and
        </li>
        <li>
          end this Agreement in line with the Ending this Agreement section.
        </li>
        <li>
          Nothing in this Agreement excludes, restricts or modifies the
          Participant’s rights under the Australian Consumer Law, including the
          consumer guarantees, or the protections of the NDIS Code of Conduct.
        </li>
      </BulletList>

      {/* ================================================================
          22. GENERAL
          ================================================================ */}

      <SectionHeading>22. GENERAL</SectionHeading>

      <SubHeading>Governing law</SubHeading>

      <p className={styles.bodyText}>
        This Agreement is governed by the laws of the Commonwealth of Australia
        and New South Wales.
      </p>

      <SubHeading>Entire agreement</SubHeading>

      <p className={styles.bodyText}>
        This Agreement replaces any earlier service agreement or arrangement
        between the parties, except for any amounts still owing under an earlier
        arrangement.
      </p>

      <SubHeading>Relationship of the parties</SubHeading>

      <p className={styles.bodyText}>
        Nothing in this Agreement creates a relationship of employer and
        employee, partnership, joint venture or agency between the parties.
      </p>

      <SubHeading>Authority of the Participant’s Representative</SubHeading>

      <p className={styles.bodyText}>
        The Participant’s Representative confirms that they have authority to
        act on behalf of the Participant. The Representative does not become
        personally responsible for the Participant’s payment obligations by
        signing this Agreement, except where the Representative manages the
        Participant’s NDIS funding (in which case they are responsible for
        paying for Supports from that funding) or expressly agrees in writing to
        pay specified amounts.
      </p>

      <SubHeading>Severability</SubHeading>

      <p className={styles.bodyText}>
        If part of this Agreement cannot be enforced, the rest of this Agreement
        still applies.
      </p>

      <SubHeading>Notices</SubHeading>

      <p className={styles.bodyText}>
        Written notices under this Agreement may be given by email or post to
        the contact details in the Parties to this Agreement section.
      </p>

      {/* ================================================================
          23. SCHEDULE OF SUPPORTS
          ================================================================ */}

      <div className={styles.majorSection}>
        <SectionHeading>23. SCHEDULE OF SUPPORTS</SectionHeading>

        <p className={styles.bodyText}>
          KALURA will provide the following Supports at the prices set out below
          (or as varied under the Changing this Agreement section). Prices
          remain within the maximum prices in the NDIS Pricing Arrangements.
        </p>

        <SubHeading>Agreed supports and prices</SubHeading>

        <table className={styles.supportsTable}>
          <thead>
            <tr>
              <th>Support item</th>
              <th>Description (scope and volume)</th>
              <th>Price and payment information</th>
              <th>How, when and where provided</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                <TextInput value={supportItem1} onChange={setSupportItem1} />
              </td>
              <td>
                <TextArea
                  value={supportDescription1}
                  onChange={setSupportDescription1}
                  rows={3}
                />
              </td>
              <td>
                <TextArea
                  value={supportPrice1}
                  onChange={setSupportPrice1}
                  rows={3}
                />
              </td>
              <td>
                <TextArea
                  value={supportDelivery1}
                  onChange={setSupportDelivery1}
                  rows={3}
                />
              </td>
            </tr>

            <tr>
              <td>
                <TextInput value={supportItem2} onChange={setSupportItem2} />
              </td>
              <td>
                <TextArea
                  value={supportDescription2}
                  onChange={setSupportDescription2}
                  rows={3}
                />
              </td>
              <td>
                <TextArea
                  value={supportPrice2}
                  onChange={setSupportPrice2}
                  rows={3}
                />
              </td>
              <td>
                <TextArea
                  value={supportDelivery2}
                  onChange={setSupportDelivery2}
                  rows={3}
                />
              </td>
            </tr>

            <tr>
              <td>
                <TextInput value={supportItem3} onChange={setSupportItem3} />
              </td>
              <td>
                <TextArea
                  value={supportDescription3}
                  onChange={setSupportDescription3}
                  rows={3}
                />
              </td>
              <td>
                <TextArea
                  value={supportPrice3}
                  onChange={setSupportPrice3}
                  rows={3}
                />
              </td>
              <td>
                <TextArea
                  value={supportDelivery3}
                  onChange={setSupportDelivery3}
                  rows={3}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <SubHeading>Agreed claim types</SubHeading>

        <p className={styles.bodyText}>
          The following claim types have been explained to the Participant and
          are agreed for the Supports above, in line with the sections of this
          Agreement named below.
        </p>

        <div className={styles.claimTable}>
          <YesNo
            name="claimNonFace"
            label="Non-face-to-face supports (see Claiming for Non-Face-to-Face Supports)"
            value={claimNonFace}
            onChange={setClaimNonFace}
          />

          <YesNo
            name="claimTravelLabour"
            label="Provider travel: labour time (see Claiming for Provider Travel)"
            value={claimTravelLabour}
            onChange={setClaimTravelLabour}
          />

          <YesNo
            name="claimTravelNonLabour"
            label="Provider travel: non-labour costs, including any agreed contribution per kilometre (see Claiming for Provider Travel)"
            value={claimTravelNonLabour}
            onChange={setClaimTravelNonLabour}
          />

          <YesNo
            name="claimCancellation"
            label="Short Notice Cancellation terms (see Short Notice Cancellations)"
            value={claimCancellation}
            onChange={setClaimCancellation}
          />

          <YesNo
            name="claimReports"
            label="NDIA Requested Reports (see NDIA Requested Reports)"
            value={claimReports}
            onChange={setClaimReports}
          />
        </div>

        <SubHeading>Conditions attached to supports</SubHeading>

        <p className={styles.bodyText}>
          Any conditions attached to the delivery of particular Supports are
          listed here, with the reason each condition is attached.
        </p>

        <table className={styles.twoColumnTable}>
          <thead>
            <tr>
              <th>Condition</th>
              <th>Reason the condition is attached</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <TextArea
                  value={conditions}
                  onChange={setConditions}
                  rows={4}
                />
              </td>
              <td>
                <TextArea
                  value={conditionReasons}
                  onChange={setConditionReasons}
                  rows={4}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <SubHeading>Funding Periods</SubHeading>

        <p className={styles.bodyText}>
          Where the Participant’s plan uses Funding Periods, the periods for
          each funding component are recorded here. KALURA will only deliver
          Supports within the funding available for each period.
        </p>

        <table className={styles.fundingTable}>
          <thead>
            <tr>
              <th>Funding component</th>
              <th>Funding Period dates (DD/MM/YYYY to DD/MM/YYYY)</th>
              <th>Notes</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                <TextInput
                  value={fundingComponent}
                  onChange={setFundingComponent}
                />
              </td>
              <td>
                <TextInput value={fundingDates} onChange={setFundingDates} />
              </td>
              <td>
                <TextArea value={fundingNotes} onChange={setFundingNotes} />
              </td>
            </tr>
          </tbody>
        </table>
        </div>

      {/* ================================================================
          24. PARTICIPANT CONSENT FORM
          ================================================================ */}

      <div className={styles.majorSection}>
        <SectionHeading>24. PARTICIPANT CONSENT FORM</SectionHeading>

        <SubHeading>Purpose of this Consent Form</SubHeading>

        <p className={styles.bodyText}>
          The purpose of this consent form is to ensure that you understand how
          KALURA collects, uses, and shares your personal information. KALURA
          requires to collect, hold, and manage your personal information to
          effectively assess, coordinate, and deliver the necessary supports and
          services you require. In some cases, this information may need to be
          shared with relevant individuals, service providers, or government and
          non-government agencies to ensure seamless service delivery and
          compliance with legal and regulatory requirements.
        </p>

        <p className={styles.bodyText}>
          KALURA gathers personal information to:
        </p>

        <BulletList>
          <li>Evaluate your support needs and deliver appropriate services</li>
          <li>
            Fulfill legal and regulatory requirements under the National
            Disability Insurance Scheme (NDIS)
          </li>
          <li>
            Improve service planning and delivery to enhance client outcomes
          </li>
        </BulletList>

        <p className={styles.bodyText}>
          KALURA adheres strictly to privacy laws and regulations, ensuring the
          protection of your information under the following laws:
        </p>

        <BulletList>
          <li>National Disability Insurance Scheme (NDIS) Act 2013</li>
          <li>
            Australian Privacy Principles (APPs) under the Privacy Act 1988
            (Cth)
          </li>
          <li>
            Any applicable State or Territory Privacy legislation, including
            specific health records acts and regulations governing the handling,
            storage, and sharing of personal information in each jurisdiction.
          </li>
        </BulletList>

        <p className={styles.bodyText}>
          We are committed to protecting your personal information and using it
          solely for the intended purposes outlined in this document. If you
          have any concerns regarding how your information is managed, you are
          encouraged to contact KALURA for further clarification.
        </p>

        <SubHeading>Your Consent</SubHeading>

        <p className={styles.bodyText}>
          Please indicate your consent preferences by selecting ‘Yes’ or ‘No’. I
          authorise KALURA to:
        </p>

        <div className={styles.consentTable}>
          <YesNo
            name="consentPersonalInfo"
            label="Collect, use, and store my personal information to provide services"
            value={consentPersonalInfo}
            onChange={setConsentPersonalInfo}
          />

          <YesNo
            name="consentProviders"
            label="Share my personal information with service providers (except as specified below)"
            value={consentProviders}
            onChange={setConsentProviders}
          />

          <YesNo
            name="consentResearch"
            label="Use my de-identified information for research, analysis, and reporting"
            value={consentResearch}
            onChange={setConsentResearch}
          />

          <YesNo
            name="consentNdisPortal"
            label="Access my personal information on the NDIS Portal"
            value={consentNdisPortal}
            onChange={setConsentNdisPortal}
          />

          <YesNo
            name="consentNdisPlan"
            label="Access a copy of my NDIS Plan from the NDIA or its agents"
            value={consentNdisPlan}
            onChange={setConsentNdisPlan}
          />

          <YesNo
            name="consentNdisPortion"
            label="Access the portion of my NDIS Plan that relates to KALURA-provided supports"
            value={consentNdisPortion}
            onChange={setConsentNdisPortion}
          />
        </div>

        <SubHeading>Verbal Consent</SubHeading>

        <p className={styles.bodyText}>
          At times, verbal consent may be required for urgent referrals or
          immediate service needs. If given, KALURA will record this in your
          client records.
        </p>

        <p className={styles.bodyText}>
          KALURA may also be required to disclose your personal information
          without consent if:
        </p>

        <BulletList>
          <li>
            It is necessary to prevent a serious risk to life, health, or safety
          </li>
          <li>It is required by law.</li>
        </BulletList>

        <SubHeading>Photography Consent</SubHeading>

        <p className={styles.bodyText}>
          Please indicate your consent preferences by selecting ‘Yes’ or ‘No’. I
          authorise KALURA to:
        </p>

        <div className={styles.consentTable}>
          <YesNo
            name="photoService"
            label="Take and use photographs and videos of me for service delivery purposes (if applicable)."
            value={photoService}
            onChange={setPhotoService}
          />

          <YesNo
            name="photoMarketing"
            label="Take and use photographs and videos of me for marketing and promotional materials."
            value={photoMarketing}
            onChange={setPhotoMarketing}
          />

          <YesNo
            name="photoPublications"
            label="use my image in printed materials, online publications, or social media platforms."
            value={photoPublications}
            onChange={setPhotoPublications}
          />
        </div>

        <p className={styles.bodyText}>By signing below, I confirm that:</p>

        <BulletList>
          <li>
            I understand that photographs and videos may be used in the ways
            specified above.
          </li>
          <li>
            I can withdraw my consent at any time by notifying KALURA in
            writing.
          </li>
        </BulletList>

        <SubHeading>Communication Consent</SubHeading>

        <p className={styles.bodyText}>
          Please indicate your consent preferences by selecting ‘Yes’ or ‘No’. I
          authorise KALURA to:
        </p>

        <div className={styles.consentTable}>
          <YesNo
            name="newsletter"
            label="Send me information about services via a Newsletter."
            value={newsletter}
            onChange={setNewsletter}
          />

          <YesNo
            name="serviceOpportunities"
            label="Contact me to advise me of service-related opportunities."
            value={serviceOpportunities}
            onChange={setServiceOpportunities}
          />
        </div>

        <SubHeading>Information Storage and Security</SubHeading>

        <p className={styles.bodyText}>
          KALURA is committed to safeguarding your personal information through
          secure storage systems and strict access controls. All personal
          information collected is stored in our encrypted Client Management
          System, which is protected against unauthorised access, modification,
          or disclosure.
        </p>

        <p className={styles.bodyText}>Key security measures include:</p>

        <BulletList>
          <li>
            <strong>Encryption &amp; Secure Storage:</strong> All electronic
            records are encrypted and stored on secure servers with restricted
            access.
          </li>
          <li>
            <strong>Access Controls:</strong> Only authorised personnel with
            appropriate clearance levels can access your data.
          </li>
          <li>
            <strong>Regular Audits &amp; Compliance Checks:</strong> Our
            security protocols are reviewed and updated regularly to comply with
            the latest privacy regulations and best practices.
          </li>
          <li>
            <strong>Retention &amp; Disposal:</strong> Your information is
            retained only for as long as necessary to fulfil service and legal
            obligations. When no longer needed, it is securely destroyed or
            de-identified in accordance with applicable laws.
          </li>
        </BulletList>

        <p className={styles.bodyText}>
          If you have any concerns or require further information about how your
          personal data is stored and secured, please contact our Privacy
          Officer.
        </p>

        <SubHeading>Accessing and Updating Your Information</SubHeading>

        <p className={styles.bodyText}>
          You have the right to access and update your personal information held
          by KALURA to ensure its accuracy and completeness. If you wish to:
        </p>

        <BulletList>
          <li>
            Request a copy of the personal information KALURA holds about you
          </li>
          <li>
            Correct or update any inaccuracies in your personal information
          </li>
          <li>
            Withdraw or modify your consent regarding information use and
            sharing
          </li>
        </BulletList>

        <p className={styles.bodyText}>
          Please submit your request in writing or contact our Privacy Officer.
          KALURA will process access and update requests in accordance with
          relevant privacy laws and respond within a reasonable timeframe.
          Identification may be required to verify your request.
        </p>

        <SubHeading>Privacy Policy and Contact Information</SubHeading>

        <p className={styles.bodyText}>
          KALURA’s full Privacy Policy is available at:
          https://www.kalura.com.au
        </p>

        <p className={styles.bodyText}>
          For privacy-related enquiries, contact:
        </p>

        <BulletList>
          <li>Privacy Officer: Shaun Jeffs</li>
          <li>Email Address: sjeffs@kalura.com.au</li>
          <li>Address: 29 Billarga Road, Westleigh, NSW 2120</li>
          <li>Contact Number: 0439 830 602</li>
        </BulletList>

        <SubHeading>Participant Consent Confirmation</SubHeading>

        <CheckboxRow checked={consentGiven} onChange={setConsentGiven}>
          I confirm that I have read and understood this Participant Consent Form.
        </CheckboxRow>

        <table className={styles.infoTable}>
          <tbody>
            <tr>
              <th>Participant Consent Name</th>
              <td>
                <TextInput value={consentName} onChange={setConsentName} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ================================================================
          25. AGREEMENT SIGNATURES
          ================================================================ */}

        <div className={styles.majorSection}>
          <SectionHeading>25. AGREEMENT SIGNATURES</SectionHeading>

        <p className={styles.bodyText}>
          The Participant and KALURA agree to the terms of this Agreement.
        </p>

        <p className={styles.bodyText}>
          KALURA’s policies and procedures named in this Agreement are available
          to the Participant on request, and the Rights and Responsibilities
          Policy and Procedure and the Feedback and Complaints Management Policy
          and Procedure have been explained to the Participant.
        </p>

        <SubHeading>Supporting the Participant’s understanding</SubHeading>

        <CheckboxRow checked={understanding} onChange={setUnderstanding}>
          This Agreement was explained to the Participant using the language,
          mode of communication and terms that the Participant is most likely to
          understand.
        </CheckboxRow>

        <div className={styles.communicationSupport}>
          <div className={styles.checkboxText}>
            An interpreter, Easy Read material or other communication support
            was:
          </div>

          <CheckboxRow
            checked={communicationUsed}
            onChange={setCommunicationUsed}
          >
            used
          </CheckboxRow>

          <CheckboxRow
            checked={communicationDeclined}
            onChange={setCommunicationDeclined}
          >
            offered and declined
          </CheckboxRow>

          <CheckboxRow
            checked={communicationNotRequired}
            onChange={setCommunicationNotRequired}
          >
            not required
          </CheckboxRow>
        </div>

        <CheckboxRow
          checked={independentAdvice}
          onChange={setIndependentAdvice}
        >
          The Participant had the opportunity to ask questions and to seek
          independent advice or support from an advocate before signing.
        </CheckboxRow>

        <div className={styles.signatureBlock}>
          <h4>The Participant</h4>

          <table className={styles.signatureTable}>
            <tbody>
              <tr>
                <th>Full name</th>
                <td>
                  <TextInput
                    value={participantSigningName}
                    onChange={setParticipantSigningName}
                  />
                </td>
              </tr>

              <tr>
                <th>Date</th>
                <td>
                  <TextInput
                    value={participantSigningDate}
                    onChange={setParticipantSigningDate}
                    placeholder="DD/MM/YYYY"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={styles.signatureBlock}>
          <h4>The Participant’s Representative (if applicable)</h4>

          <table className={styles.signatureTable}>
            <tbody>
              <tr>
                <th>Name of person signing</th>
                <td>
                  <TextInput
                    value={representativeName}
                    onChange={setRepresentativeName}
                  />
                </td>
              </tr>

              <tr>
                <th>Date</th>
                <td>
                  <TextInput
                    value={representativeDate}
                    onChange={setRepresentativeDate}
                    placeholder="DD/MM/YYYY"
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <p className={styles.smallText}>
            If the Participant’s Representative signs this Agreement on the
            Participant’s behalf, supporting documentation of their authority to
            act is attached or held on file.
          </p>
        </div>

        <div className={styles.signatureBlock}>
          <h4>KALURA</h4>

          <table className={styles.signatureTable}>
            <tbody>
              <tr>
                <th>Name and position of person signing</th>
                <td>
                  <div>
                    <strong>Shaun Jeffs</strong>
                    <br />
                    Chief Executive Officer
                  </div>
                </td>
              </tr>

              <tr>
                <th>Signature</th>
                <td>
                  <img
                    src={signatureImage}
                    alt="Shaun Jeffs signature"
                    style={{
                      width: "100px",
                      height: "55px",
                      maxWidth: "100%",
                      objectFit: "contain",
                      objectPosition: "left center",
                      display: "block",
                    }}
                  />
                </td>
              </tr>

              <tr>
                <th>Date</th>
                <td>
                  <TextInput
                    value={kaluraDate}
                    onChange={setKaluraDate}
                    placeholder="DD/MM/YYYY"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        </div>

      <footer className={styles.footer}>
        <span>Service Agreement v1.1</span>
        <span>KALURA</span>
      </footer>
    </div>
  );
}
