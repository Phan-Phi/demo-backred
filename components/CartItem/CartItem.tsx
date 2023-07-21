import { useUpdateEffect } from "react-use";
import React, { useEffect, useState } from "react";

import { Box, Stack, Typography, styled } from "@mui/material";

import Image from "../Image";
import { useCart } from "@/hooks";
import { CounterInput, SVG } from "..";
import VNDCurrency from "../NumberFormat/VNDCurrency";

type CartItemProps = {
  id: number | string;
  name: string;
  price: number;
  quantityOfProduct: number;
  onDeleteItem: () => void;
};

export default function CartItem(props: CartItemProps) {
  const { id, name, price, quantityOfProduct, onDeleteItem } = props;

  const { updateProductItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(quantityOfProduct);
  }, [quantityOfProduct]);

  useUpdateEffect(() => {
    updateProductItem(id, quantity);
  }, [id, quantity]);

  return (
    <StyledWrapper className="cart-item">
      <StyledFirstColumn className="cart-item__first-column">
        <Box position="relative" width={69} height={96}>
          <Image src="/image/cardProduct.png" alt="cart-item" />
        </Box>

        <Stack>
          <StyledText className="cart-item__title">{name}</StyledText>
          <StyledText className="cart-item__variant">Mayonnaise - Nhân Trứng</StyledText>
        </Stack>
      </StyledFirstColumn>

      <StyledPrice className="cart-item__price" value={price} />

      <CounterInput
        value={quantity}
        onValueChange={setQuantity}
        // onValueChangeDelete={setQuantity}
      />

      <StyledTotalPrice className="cart-item__total-price" value={quantity * price} />

      <StyledWrapperSVG onClick={onDeleteItem}>
        <SVG src="/svg/delete.svg" />
      </StyledWrapperSVG>
    </StyledWrapper>
  );
}

const StyledWrapper = styled(Box)(() => {
  return {
    padding: 16,
    borderRadius: 8,
    border: "0.3px solid #fff",

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  };
});

const StyledFirstColumn = styled(Stack)(() => {
  return {
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  };
});

const StyledText = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.p_medium,
    fontWeight: 600,
    color: "#fff",
  };
});

const StyledPrice = styled(VNDCurrency)(({ theme }) => {
  return {
    ...theme.typography.p_small,
    color: "#fff",
  };
});

const StyledTotalPrice = styled(VNDCurrency)(({ theme }) => {
  return {
    ...theme.typography.p_large,
    fontWeight: 600,
    color: "#fff",

    minWidth: 200,
    textAlign: "center",
  };
});

const StyledWrapperSVG = styled(Box)(() => {
  return {
    cursor: "pointer",
  };
});
