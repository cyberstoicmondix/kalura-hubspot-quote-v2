import { useState } from "react";
import styles from "../TermsAcceptance.module.css";

export default function Checkbox({
  checkboxLabel,
}: {
  checkboxLabel: string;
  isInEditor?: boolean;
}) {
  const [checked, setChecked] = useState(false);

  return (
    <label className={styles.checkboxLabel}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
      <span>{checkboxLabel}</span>
    </label>
  );
}
