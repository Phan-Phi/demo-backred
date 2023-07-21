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

import { transformUrl } from "libs";
import InputForAutocomplete from "./InputForAutoComplete";
import { DISTRICTS_TYPE, responseSchema } from "@/interfaces";
import { DISTRICTS_API } from "@/apis";
import { get } from "lodash";

interface DistrictProps {
  controlState: any;
  province?: string;
  InputProps?: InputProps;
  onChange?: (value: any) => void;
  FormLabelProps?: FormLabelProps;
  FormControlProps?: FormControlProps;
  FormHelperTextProps?: FormHelperTextProps;
  readOnly?: boolean;
  disabled?: boolean;
}
const District = (props: DistrictProps) => {
  const {
    onChange: onChangeOuter,
    InputProps: OuterInputProps,
    controlState,
    FormControlProps,
    FormHelperTextProps,
    FormLabelProps,
    province,
    readOnly,
    disabled,
  } = props;

  const { field, fieldState } = controlState as UseControllerReturn;
  const { onChange, ref, value } = field;
  const { error } = fieldState;

  const [isShown, toggleIsShown] = useToggle(false);

  const { data } = useSWR<responseSchema<DISTRICTS_TYPE>>(() => {
    if (isShown && province) {
      return transformUrl(DISTRICTS_API, {
        province_code: province,
        limit: 1000,
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

  const dataDistricts = get(data, "items");

  return (
    <Autocomplete
      readOnly={readOnly}
      options={dataDistricts ?? []}
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
            label="Quận / Huyện"
            error={!!error}
            errorMessage={error && error.message}
            FormLabelProps={FormLabelProps}
            FormHelperTextProps={FormHelperTextProps}
            InputProps={{
              ...props.InputProps,
              ...OuterInputProps,
              inputRef: ref,
            }}
          />
        );
      }}
      // loading={!data && isShown}
      getOptionLabel={(option) => option["name"]}
      ListboxProps={{
        style: {
          color: "white",
          backgroundColor: "#262626",
          border: "1px solid #fff",
          borderRadius: 6,
        },
      }}
      // disabled={!province}
    />
  );
};

export default District;
