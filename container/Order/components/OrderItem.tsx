import React from "react";

import { Box, styled, Typography, Stack } from "@mui/material";

import { Image, VNDCurrency } from "@/components";
import { CARD_PRODUCT_BOX_SHADOW } from "@/constants";

export default function OrderItem() {
  return (
    <StyledWrapper className="order-item">
      <StyledStack>
        <Box position="relative" width={69} height={96}>
          <Image
            alt="alt"
            src="/image/cardProduct.png"
            style={{ objectFit: "contain" }}
          />

          <StyledWrapperQuantity>
            <StyledQuantity>12</StyledQuantity>
          </StyledWrapperQuantity>
        </Box>

        <StyledTitle>Cá Viên Nhân Sốt Mayonnaise - Nhân Trứng</StyledTitle>
      </StyledStack>

      <StyledPrice value={35000} />
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
    top: 0,
    right: 0,
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
