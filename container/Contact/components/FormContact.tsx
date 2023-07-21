import React, { useCallback } from "react";
import { useMountedState } from "react-use";
import { Controller, useForm } from "react-hook-form";

import { styled, Box, Button } from "@mui/material";

import { Headline, LoadingButton, Spacing } from "@/components";
import { FormControl, FormControlForPhoneNumber } from "@/compositions";

import { BUTTON } from "@/constants";
import { CONTACTS_API } from "@/apis";
import axios from "../../../axios.config";
import { useNotification } from "@/hooks";
import { ContactSchema, ContactSchemaProps, DefaultContactFormState } from "@/yups";

export default function FormContact() {
  const isMounted = useMountedState();

  const { loading, setLoading, enqueueSnackbarWithError, enqueueSnackbarWithSuccess } =
    useNotification();

  const { control, handleSubmit, reset } = useForm({
    resolver: ContactSchema(),
    defaultValues: DefaultContactFormState(),
  });

  const onSubmit = useCallback(async (values: ContactSchemaProps) => {
    try {
      setLoading(true);

      const { email, message, name, phone_number } = values;

      const data = {
        email,
        name,
        phone_number,
        content: message,
      };

      await axios.post(CONTACTS_API, data);

      reset(DefaultContactFormState, {
        keepDirty: false,
      });

      enqueueSnackbarWithSuccess(
        "Tin nhắn được gửi thành công, chúng tôi sẽ liên hệ trong thời gian sớm nhất."
      );
    } catch (error) {
      enqueueSnackbarWithError(error);
    } finally {
      if (isMounted()) {
        setLoading(false);
      }
    }
  }, []);

  return (
    <StyledWrapper>
      <Headline title="Form liên hệ" />

      <Spacing spacing={3} />

      <StyledForm component="form">
        <Controller
          name="name"
          control={control}
          render={(props) => {
            return <FormControl controlState={props} label="Tên" />;
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
          name="message"
          control={control}
          render={(props) => {
            return (
              <FormControl
                label="Nội Dung"
                controlState={props}
                InputProps={{
                  rows: 10,
                  multiline: true,
                }}
              />
            );
          }}
        />
      </StyledForm>

      <Spacing spacing={3} />

      {loading ? (
        <LoadingButton />
      ) : (
        <StyledButton type="submit" onClick={handleSubmit(onSubmit)}>
          {BUTTON.SEND_INFO}
        </StyledButton>
      )}
    </StyledWrapper>
  );
}

const StyledWrapper = styled(Box)(() => {
  return {
    padding: "0 200px",
  };
});

const StyledForm = styled(Box)(() => {
  return {
    gap: 8,
    display: "flex",
    flexDirection: "column",
  };
});

const StyledButton = styled(Button)(() => {
  return {
    textTransform: "none",
  };
});
