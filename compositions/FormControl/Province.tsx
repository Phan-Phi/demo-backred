import useSWR from "swr";
import { useToggle } from "react-use";
import React, { useCallback } from "react";
import { UseControllerReturn } from "react-hook-form";

import {
  InputProps,
  Autocomplete,
  FormLabelProps,
  FormControlProps,
  FormHelperTextProps,
} from "@mui/material";
import InputForAutocomplete from "./InputForAutoComplete";

import { get } from "lodash";
import { PROVINCES_API } from "@/apis";
import { PROVINCES_TYPE, responseSchema } from "@/interfaces";

interface ProvinceProps {
  controlState?: any;
  onChange?: (value: any) => void;
  InputProps?: InputProps;
  FormLabelProps?: FormLabelProps;
  FormControlProps?: FormControlProps;
  FormHelperTextProps?: FormHelperTextProps;
  readOnly?: boolean;
  disabled?: boolean;
}

const Province = (props: ProvinceProps) => {
  const {
    controlState,
    FormControlProps,
    FormHelperTextProps,
    FormLabelProps,
    InputProps: OuterInputProps,
    onChange: onChangeOuter,
    readOnly,
    disabled,
  } = props;

  const { field, fieldState } = controlState as UseControllerReturn;
  const { onChange, ref, value } = field;
  const { error } = fieldState;

  const [isShown, toggleIsShown] = useToggle(false);

  const url = `${PROVINCES_API}?limit=1000`;

  const { data } = useSWR<responseSchema<PROVINCES_TYPE>>(() => {
    if (isShown) return url;

    return url;
  });

  const onChangeHandler = useCallback(
    (_: any, value: any) => {
      onChange(value);
      onChangeOuter && onChangeOuter(value);
    },
    [onChange, onChangeOuter]
  );

  const dataProvinces = get(data, "items");

  return (
    <Autocomplete
      readOnly={readOnly}
      disabled={disabled}
      options={dataProvinces ?? []}
      open={isShown}
      value={value}
      onChange={onChangeHandler}
      onOpen={() => toggleIsShown(true)}
      onClose={() => toggleIsShown(false)}
      renderInput={(props) => {
        return (
          <InputForAutocomplete
            FormControlProps={FormControlProps}
            {...props}
            label="Tỉnh / Thành"
            error={!!error}
            errorMessage={error && error.message}
            FormLabelProps={FormLabelProps}
            FormHelperTextProps={FormHelperTextProps}
            InputProps={{ ...props.InputProps, ...OuterInputProps, inputRef: ref }}
          />
        );
      }}
      loading={!data && isShown}
      getOptionLabel={(option) => option["name"]}
      ListboxProps={{
        style: {
          color: "white",
          backgroundColor: "#262626",
          border: "1px solid #fff",
          borderRadius: 6,
        },
      }}
    />
  );
};
export default Province;
