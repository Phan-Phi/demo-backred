import React from "react";
import { UseControllerReturn } from "react-hook-form";

import { FormControlBase } from "@/components";
import { FormControlBaseProps } from "@/components/Input/FormControlBase";

type FormControlProps = {
  controlState: any;
  label?: React.ReactNode;
  placeholder?: string;
} & FormControlBaseProps;

export default function FormControl(props: FormControlProps) {
  const {
    FormControlProps,
    FormLabelProps,
    FormHelperTextProps,
    InputProps,
    controlState,
    label,
    placeholder,
  } = props;

  const { field, fieldState } = controlState as UseControllerReturn;

  const { name, onBlur, onChange, ref, value } = field;
  const { error } = fieldState;

  return (
    <FormControlBase
      FormControlProps={{
        error: !!error,
        ...FormControlProps,
      }}
      FormLabelProps={{
        children: label,
        ...FormLabelProps,
        htmlFor: name,
      }}
      InputProps={{
        placeholder,
        id: name,
        value,
        onChange,
        inputRef: ref,
        onBlur,
        autoComplete: "off",
        ...InputProps,
      }}
      FormHelperTextProps={{ children: error && error.message, ...FormHelperTextProps }}
    />
  );
}
