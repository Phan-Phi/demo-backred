import { useForm } from "react-hook-form";
import React, { useCallback, useState } from "react";

import { Container, Grid, styled, Stack, Typography, Button } from "@mui/material";

import ModalVAT from "./components/ModalVAT";
import CheckVAT from "./components/CheckVAT";
import FormOrder from "./components/FormOrder";
import OrderItem from "./components/OrderItem";
import { Headline, Spacing, VNDCurrency } from "@/components";

import { useToggle } from "@/hooks";
import { VATSchemaProps } from "@/yups";

export default function Order() {
  const { control, handleSubmit, setValue, watch } = useForm();
  const [checkVAT, setCheckVAT] = useState(false);
  const [dataVAT, setDataVAT] = useState<VATSchemaProps[]>([]);

  const { on: openVAT, toggleOff: onCloseVAT, toggleOn: onOpenVAT } = useToggle();

  const onSubmit = useCallback(async () => {}, []);

  return (
    <StyledContainer>
      <Headline subTitle="Đặt hàng" title="Thông tin giao hàng" />

      <Spacing spacing={5} />

      <Grid container spacing="40px">
        <Grid item xs={8}>
          <FormOrder control={control} setValue={setValue} watch={watch} />
        </Grid>
        <Grid item xs={4}>
          <Stack gap="32px">
            <StyledWrapperOrderItem>
              <OrderItem />
              <OrderItem />
              <OrderItem />
              <OrderItem />
            </StyledWrapperOrderItem>

            <CheckVAT
              checkVAT={checkVAT}
              onOpenVAT={onOpenVAT}
              setCheckVAT={setCheckVAT}
              setDataVAT={setDataVAT}
            />

            <ModalVAT open={openVAT} onClose={onCloseVAT} setDataVAT={setDataVAT} />

            <StyledCenter>
              <StyledWrapperTotalPrice>
                <StyledText>Tổng Tiền:</StyledText>

                <StyledTotalPrice value={170000} />
              </StyledWrapperTotalPrice>
            </StyledCenter>

            <StyledButton type="submit" onClick={handleSubmit(onSubmit)}>
              Đặt Hàng
            </StyledButton>
          </Stack>
        </Grid>
      </Grid>
    </StyledContainer>
  );
}

const StyledContainer = styled(Container)(() => {
  return {
    paddingTop: 180,
    paddingBottom: 80,
  };
});

const StyledWrapperOrderItem = styled(Stack)(() => {
  return {
    gap: 16,
  };
});

const StyledCenter = styled(Stack)(() => {
  return {
    alignItems: "center",
    justifyContent: "center",
  };
});

const StyledWrapperTotalPrice = styled(Stack)(() => {
  return {
    gap: 40,
    flexDirection: "row",
    alignItems: "center",
  };
});

const StyledText = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.p_large,
    fontWeight: 600,
  };
});

const StyledTotalPrice = styled(VNDCurrency)(({ theme }) => {
  return {
    ...theme.typography.h5,
    fontWeight: 800,
    color: theme.palette.primary.main,
  };
});

const StyledButton = styled(Button)(() => {
  return {
    textTransform: "capitalize",
  };
});
