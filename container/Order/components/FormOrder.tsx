import React from "react";
import { Controller } from "react-hook-form";
import { Control, UseFormSetValue, UseFormWatch } from "react-hook-form";

import { Box, FormLabel, styled, Typography } from "@mui/material";

import {
  Ward,
  District,
  Province,
  FormControl,
  FormControlForPhoneNumber,
} from "@/compositions";
import { Stack } from "@/components";

import { OrderSchemaProps } from "@/yups";

type FormOrderProps = {
  control: Control<OrderSchemaProps, any>;
  setValue: UseFormSetValue<OrderSchemaProps>;
  watch: UseFormWatch<any>;
};

export default function FormOrder(props: FormOrderProps) {
  const { control, setValue, watch } = props;

  return (
    <StyledForm component="form">
      <Controller
        name="name"
        control={control}
        render={(props) => {
          return <FormControl controlState={props} label="Tên khách hàng" />;
        }}
      />

      <Controller
        name="phone_number"
        control={control}
        render={(props) => {
          return <FormControlForPhoneNumber controlState={props} />;
        }}
      />

      <Controller
        name="email"
        control={control}
        render={(props) => {
          return <FormControl controlState={props} label="Email" />;
        }}
      />

      <Controller
        name="address"
        control={control}
        render={(props) => {
          return <FormControl controlState={props} label="Địa chỉ" />;
        }}
      />

      <Box sx={{ width: "100%" }}>
        <Controller
          name="province"
          control={control}
          render={(props) => {
            return (
              <Province
                controlState={props}
                InputProps={{
                  fullWidth: true,
                }}
                onChange={() => {
                  setValue("district", null);
                  setValue("ward", null);
                }}
              />
            );
          }}
        />
      </Box>

      <Box sx={{ width: "100%" }}>
        <Controller
          name="district"
          control={control}
          render={(props) => {
            const provinceTuple = watch("province");
            return (
              <District
                controlState={props}
                province={provinceTuple ? provinceTuple?.code : undefined}
                onChange={() => {
                  setValue("ward", null);
                }}
              />
            );
          }}
        />
      </Box>

      <Box sx={{ width: "100%" }}>
        <Controller
          name="ward"
          control={control}
          render={(props) => {
            const districtTuple = watch("district");

            return (
              <Ward
                controlState={props}
                district={districtTuple ? districtTuple["code"] : undefined}
              />
            );
          }}
        />
      </Box>

      <Controller
        name="note"
        control={control}
        render={(props) => {
          return (
            <FormControl
              controlState={props}
              label="Ghi chú giao hàng (không bắt buộc)"
              InputProps={{
                multiline: true,
                rows: 8,
              }}
            />
          );
        }}
      />
    </StyledForm>
  );
}

const StyledForm = styled(Box)(() => {
  return {
    gap: 16,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  };
});

const StyledLabel = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.p_small,
    fontWeight: 500,
  };
});

const StyledSmallLabel = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.p_xSmall,
    fontStyle: "italic",
  };
});

const LabelNote = ({ htmlFor }: { htmlFor: string }) => {
  return (
    <FormLabel htmlFor="note">
      <Stack flexDirection="row" gap="4px" alignItems="baseline">
        <StyledLabel>Ghi chú giao hàng</StyledLabel>

        <StyledSmallLabel>(không bắt buộc)</StyledSmallLabel>
      </Stack>
    </FormLabel>
  );
};
