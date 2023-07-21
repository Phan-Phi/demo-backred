import React, { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";

import { Dialog, styled, Typography, Stack, Button } from "@mui/material";

import { FormControl, FormControlForPhoneNumber } from "@/compositions";

import { BUTTON, CARD_PRODUCT_BOX_SHADOW } from "@/constants";
import { DefaultVATFormState, VATSchema, VATSchemaProps } from "@/yups";

type ModalVATProps = {
  open: boolean;
  onClose: () => void;
  setDataVAT: any;
};

export default function ModalVAT(props: ModalVATProps) {
  const { open, onClose, setDataVAT } = props;

  const {
    reset,
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
    resolver: VATSchema(),
    defaultValues: DefaultVATFormState(),
  });

  const onSubmit = useCallback((values: VATSchemaProps) => {
    setDataVAT(values);

    reset(DefaultVATFormState, {
      keepDirty: false,
    });

    onClose();
  }, []);

  return (
    <StyledModal open={open} onClose={onClose} scroll="body">
      <StyledTitle>Xuất VAT</StyledTitle>

      <StyledForm>
        <Controller
          name="name"
          control={control}
          render={(props) => {
            return <FormControl controlState={props} label="Họ tên khách hàng" />;
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
          name="companyName"
          control={control}
          render={(props) => {
            return <FormControl controlState={props} label="Tên công ty" />;
          }}
        />

        <Controller
          name="tax_code"
          control={control}
          render={(props) => {
            return <FormControl controlState={props} label="Mã số thuế" />;
          }}
        />

        <Controller
          name="address"
          control={control}
          render={(props) => {
            return <FormControl controlState={props} label="Địa chỉ công ty" />;
          }}
        />

        <Controller
          name="email"
          control={control}
          render={(props) => {
            return <FormControl controlState={props} label="Email nhận hóa đơn" />;
          }}
        />
      </StyledForm>

      <StyledButton
        fullWidth={true}
        type="submit"
        onClick={handleSubmit(onSubmit)}
        disabled={!isValid ? true : false}
      >
        {BUTTON.CONFIRM}
      </StyledButton>
    </StyledModal>
  );
}

const StyledModal = styled(Dialog)(() => {
  return {
    "& .MuiDialog-paper": {
      padding: 40,
      borderRadius: 8,
      minWidth: "40vw",

      backgroundColor: "#262626",
      boxShadow: CARD_PRODUCT_BOX_SHADOW,
    },
  };
});

const StyledTitle = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.h3,
    fontWeight: 700,
  };
});

const StyledForm = styled(Stack)(() => {
  return {
    gap: 8,
    margin: "24px 0",
  };
});

const StyledButton = styled(Button)(() => {
  return {
    textTransform: "capitalize",
  };
});
