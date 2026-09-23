import { Island, useEditorVariableChecks } from "@hubspot/cms-components";
// @ts-expect-error -- ?island not typed
import CheckboxIsland from "./islands/TermsAcceptance?island";
import Checkbox from "./islands/TermsAcceptance";

import type { FieldValues } from "./fields";

export { fields } from "./fields";

interface Props {
  fieldValues: FieldValues;
}

export function Component({ fieldValues }: Props) {
  const { is_in_editor: isInEditor } = useEditorVariableChecks();

  const props = {
    checkboxLabel: fieldValues.checkboxLabel,
    isInEditor,
  };

  if (isInEditor) {
    return <Checkbox {...props} />;
  }

  return <Island module={CheckboxIsland} hydrateOn="load" {...props} />;
}

export const meta = {
  label: "Kalura Checkbox",
  content_types: ["QUOTE", "QUOTE_BLUEPRINT"],
};
