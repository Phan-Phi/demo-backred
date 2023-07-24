import React from "react";
import { useRouter } from "next/router";

import useSWR from "swr";
import { Box, styled, Typography, Stack } from "@mui/material";

import { Image, VNDCurrency } from "@/components";

import { transformUrl } from "@/libs";
import { CARD_PRODUCT_BOX_SHADOW } from "@/constants";
import { PAGES_API, PRODUCTS_VARIANTS_API } from "@/apis";
import { PRODUCTS, PRODUCTS_VARIANTS } from "@/interfaces";

type OrderItemProps = {
  id: number;
  variantId: number;
  name: string;
  price: string;
  quantity: number;
};

export default function OrderItem(props: OrderItemProps) {
  const router = useRouter();
  const { id, variantId, name, price, quantity } = props;

  const { data: dataVariant } = useSWR<PRODUCTS_VARIANTS>(
    `${PRODUCTS_VARIANTS_API}${variantId}`
  );

  const { data: dataProduct } = useSWR<PRODUCTS>(
    transformUrl(`${PAGES_API}${dataVariant?.product}`, {
      fields: "*",
      locale: router.locale,
    })
  );

  if (dataVariant == undefined || dataProduct == undefined) return null;

  return (
    <StyledWrapper className="order-item">
      <StyledStack>
        <Box position="relative" width={69} height={96}>
          <Image
            alt={dataVariant.name}
            src={dataVariant.images[0].value}
            style={{ objectFit: "contain" }}
          />

          <StyledWrapperQuantity>
            <StyledQuantity>{quantity}</StyledQuantity>
          </StyledWrapperQuantity>
        </Box>

        <StyledTitle>
          {dataProduct.title} {name}
        </StyledTitle>
      </StyledStack>

      <StyledPrice value={parseFloat(price)} />
    </StyledWrapper>
  );
}

const StyledWrapper = styled(Box)(({ theme }) => {
  return {
    padding: 12,
    borderRadius: 8,
    border: `0.3px solid ${theme.palette.common.white}`,
    boxShadow: CARD_PRODUCT_BOX_SHADOW,

    gap: 40,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  };
});

const StyledStack = styled(Stack)(() => {
  return {
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
  };
});

const StyledWrapperQuantity = styled(Box)(() => {
  return {
    top: -6,
    right: -8,
    position: "absolute",

    width: 18,
    height: 18,
    borderRadius: 999,
    backgroundColor: "#D9D9D9",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
});

const StyledQuantity = styled(Typography)(({ theme }) => {
  return {
    fontSize: 8,
    lineHeight: "20px",
    fontWeight: 400,
    color: "#262626",
  };
});

const StyledTitle = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.p_xSmall,
    width: 200,
  };
});

const StyledPrice = styled(VNDCurrency)(({ theme }) => {
  return {
    ...theme.typography.p_medium,
    fontWeight: 600,
    color: theme.palette.common.white,
  };
});
