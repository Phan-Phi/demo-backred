import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useMountedState } from "react-use";
import React, { useCallback, useState } from "react";

import { clone } from "lodash";
import { Container, Grid, styled, Stack, Typography, Button } from "@mui/material";

import ModalVAT from "./components/ModalVAT";
import CheckVAT from "./components/CheckVAT";
import FormOrder from "./components/FormOrder";
import OrderSection from "./components/OrderSection";
import { Headline, LoadingButton, Spacing, VNDCurrency } from "@/components";

import { CART_API } from "@/apis";
import axiosConfig from "../../axios.config";
import { useCart, useNotification, useToggle } from "@/hooks";

import {
  OrderSchema,
  VATSchemaProps,
  OrderSchemaProps,
  DefaultOrderFormState,
} from "@/yups";

export default function Order() {
  const router = useRouter();
  const { cartKey } = useCart();
  const isMounted = useMountedState();

  const [checkVAT, setCheckVAT] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [dataVAT, setDataVAT] = useState<VATSchemaProps[]>([]);
  const { on: openVAT, toggleOff: onCloseVAT, toggleOn: onOpenVAT } = useToggle();

  const { loading, setLoading, enqueueSnackbarWithError, enqueueSnackbarWithSuccess } =
    useNotification();

  const { control, handleSubmit, setValue, watch, reset } = useForm({
    resolver: OrderSchema(),
    defaultValues: DefaultOrderFormState(),
  });

  const onSubmit = useCallback(
    async (values: OrderSchemaProps) => {
      try {
        setLoading(true);

        const { address, district, email, name, phone_number, province, ward, note } =
          values;

        const data = {
          status: 2,
          customer_name: name,
          customer_phone_number: phone_number,
          customer_email: email,
          customer_address: address,
          customer_province: province?.code,
          customer_district: district?.code,
          customer_ward: ward?.code,
          customer_note: note,
          requested_export_tax: false,
        };

        if (checkVAT) {
          if (dataVAT == undefined) return;

          const {
            name: export_tax_name,
            address: export_tax_address,
            tax_code: export_tax_identification_number,
            companyName: export_tax_company_name,
            email: export_tax_email,
            phone_number: export_tax_phone_number,
          } = dataVAT[0];

          let dataHaveVAT = {
            ...data,
            requested_export_tax: true,
            export_tax_name,
            export_tax_address,
            export_tax_identification_number,
            export_tax_company_name,
            export_tax_email,
            export_tax_phone_number,
          };

          await axiosConfig.patch(CART_API, dataHaveVAT, {
            headers: {
              "X-Cart-Key": cartKey,
            },
          });
        } else {
          let dataNoVat = clone(data);

          await axiosConfig.patch(CART_API, dataNoVat, {
            headers: {
              "X-Cart-Key": cartKey,
            },
          });
        }

        reset(DefaultOrderFormState, {
          keepDirty: false,
        });

        enqueueSnackbarWithSuccess("Đặt hàng thành công");

        router.push("/order/success");
      } catch (error) {
        enqueueSnackbarWithError(error);
      } finally {
        if (isMounted()) {
          setLoading(false);
        }
      }
    },
    [cartKey, checkVAT, dataVAT]
  );

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
            <OrderSection setTotalPrice={setTotalPrice} />

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

                <StyledTotalPrice value={totalPrice} />
              </StyledWrapperTotalPrice>
            </StyledCenter>

            {loading ? (
              <LoadingButton fullWidth={true} />
            ) : (
              <StyledButton type="submit" onClick={handleSubmit(onSubmit)}>
                Đặt Hàng
              </StyledButton>
            )}
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
