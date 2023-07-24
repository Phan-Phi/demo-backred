import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import useSWR, { KeyedMutator } from "swr";
import { Box, Stack, Typography, styled } from "@mui/material";

import Image from "../Image";
import { CounterInput, SVG } from "..";
import VNDCurrency from "../NumberFormat/VNDCurrency";

import { useCart } from "@/hooks";
import { transformUrl } from "@/libs";
import axiosConfig from "../../axios.config";
import { CART_ITEM_API, PAGES_API, PRODUCTS_VARIANTS_API } from "@/apis";

import {
  PRODUCTS,
  responseSchema,
  CART_ITEM_TYPE,
  PRODUCTS_VARIANTS,
} from "@/interfaces";

type CartItemProps = {
  id: number;
  variantId: number;
  name: string;
  price: string;
  quantityOfProduct: number;
  onDeleteItem: () => void;
  mutate: KeyedMutator<responseSchema<CART_ITEM_TYPE>>;
};

export default function CartItem(props: CartItemProps) {
  const { id, variantId, name, price, quantityOfProduct, onDeleteItem, mutate } = props;

  const router = useRouter();
  const { cartKey } = useCart();
  const [quantity, setQuantity] = useState(1);

  const { data: dataVariant } = useSWR<PRODUCTS_VARIANTS>(
    `${PRODUCTS_VARIANTS_API}${variantId}`
  );

  const { data: dataProduct } = useSWR<PRODUCTS>(
    transformUrl(`${PAGES_API}${dataVariant?.product}`, {
      fields: "*",
      locale: router.locale,
    })
  );

  useEffect(() => {
    setQuantity(quantityOfProduct);
  }, [quantityOfProduct]);

  useEffect(() => {
    async function updateQuantity() {
      await axiosConfig.patch(
        `${CART_ITEM_API}${id}`,
        { quantity },
        {
          headers: {
            "X-Cart-Key": cartKey,
          },
        }
      );
      mutate();
    }
    updateQuantity();
  }, [quantity]);

  if (dataVariant == undefined || dataProduct == undefined) return null;

  return (
    <StyledWrapper className="cart-item">
      <StyledFirstColumn className="cart-item__first-column">
        <Box position="relative" width={69} height={96}>
          <Image src={dataVariant.images[0].value} alt={dataVariant.name} />
        </Box>

        <Stack width={200}>
          <StyledText className="cart-item__title">{dataProduct.title}</StyledText>
          <StyledText className="cart-item__variant">{name}</StyledText>
        </Stack>
      </StyledFirstColumn>

      <StyledPrice className="cart-item__price" value={parseFloat(price)} />

      <CounterInput value={quantity} onValueChange={setQuantity} />

      <StyledTotalPrice
        className="cart-item__total-price"
        value={quantity * parseFloat(price)}
      />

      <StyledWrapperSVG onClick={onDeleteItem}>
        <SVG src="/svg/delete.svg" />
      </StyledWrapperSVG>
    </StyledWrapper>
  );
}

const StyledWrapper = styled(Box)(({ theme }) => {
  return {
    padding: 16,
    borderRadius: 8,
    border: `0.3px solid ${theme.palette.text.primary}`,

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
  };
});

const StyledPrice = styled(VNDCurrency)(({ theme }) => {
  return {
    ...theme.typography.p_small,
    color: theme.palette.text.primary,
  };
});

const StyledTotalPrice = styled(VNDCurrency)(({ theme }) => {
  return {
    ...theme.typography.p_large,
    fontWeight: 600,
    color: theme.palette.text.primary,

    minWidth: 200,
    textAlign: "center",
  };
});

const StyledWrapperSVG = styled(Box)(() => {
  return {
    cursor: "pointer",
  };
});
