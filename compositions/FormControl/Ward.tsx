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

import { get } from "lodash";
import { WARDS_API } from "@/apis";
import { transformUrl } from "@/libs";
import { WARD_TYPE, responseSchema } from "@/interfaces";
import InputForAutocomplete from "./InputForAutoComplete";

interface WardProps {
  controlState: any;
  district?: string;
  onChange?: (value: any) => void;
  InputProps?: InputProps;
  FormLabelProps?: FormLabelProps;
  FormControlProps?: FormControlProps;
  FormHelperTextProps?: FormHelperTextProps;
  readOnly?: boolean;
  disabled?: boolean;
}

const Ward = (props: WardProps) => {
  const {
    district,
    controlState,
    FormLabelProps,
    FormControlProps,
    FormHelperTextProps,
    onChange: onChangeOuter,
    InputProps: OuterInputProps,
    readOnly,
    disabled,
  } = props;
  const { field, fieldState } = controlState as UseControllerReturn;
  const { onChange, ref, value } = field;
  const { error } = fieldState;

  const [isShown, toggleIsShown] = useToggle(false);

  const { data } = useSWR<responseSchema<WARD_TYPE>>(() => {
    if (isShown && district) {
      return transformUrl(WARDS_API, {
        limit: 1000,
        district_code: district,
      });
    }
  });

  const onChangeHandler = useCallback(
    (_: any, value: any) => {
      onChange(value);
      onChangeOuter && onChangeOuter(value);
    },
    [onChange, onChangeOuter]
  );

  const dataWard = get(data, "items");

  return (
    <Autocomplete
      readOnly={readOnly}
      options={dataWard ?? []}
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
            label="Phường / Xã"
            error={!!error}
            errorMessage={error && error.message}
            FormLabelProps={FormLabelProps}
            FormHelperTextProps={FormHelperTextProps}
            InputProps={{ ...props.InputProps, ...OuterInputProps, inputRef: ref }}
          />
        );
      }}
      getOptionLabel={(option) => option["name"]}
      ListboxProps={{
        style: {
          color: "white",
          backgroundColor: "#262626",
          border: "1px solid #fff",
          borderRadius: 6,
        },
      }}
      // disabled={!district}
      // loading={!data && isShown}
    />
  );
};

export default Ward;
