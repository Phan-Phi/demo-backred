import { useRouter } from "next/router";
import React, { Fragment, useCallback, useEffect, useMemo, useState } from "react";

import { Container, styled, Stack, Button, Typography } from "@mui/material";

import { CartItem, Headline, Spacing, VNDCurrency } from "@/components";

import { useCart } from "@/hooks";
import { ROUTES } from "@/routes";
import { BUTTON } from "@/constants";

import { CART_ITEM_API } from "@/apis";
import axiosConfig from "../../axios.config";
import { CART_ITEM_TYPE, responseSchema } from "@/interfaces";

import useSWR from "swr";
import { isEmpty } from "lodash";

export default function Cart() {
  const router = useRouter();
  const { cartKey, fetcher } = useCart();

  const [totalPrice, setTotalPrice] = useState(0);

  const { data, mutate } = useSWR<responseSchema<CART_ITEM_TYPE>>(CART_ITEM_API, fetcher);

  useEffect(() => {
    if (data == undefined) return;

    const result = data.items.reduce((total, item) => {
      return total + parseFloat(item.variant_price) * item.quantity;
    }, 0);

    setTotalPrice(result);
  }, [data]);

  const onRedirect = useCallback(() => {
    router.push(`/${ROUTES.order}`);
  }, []);

  const handleDeleteCartItem = useCallback(async (id: number) => {
    await axiosConfig.delete(`${CART_ITEM_API}${id}`, {
      headers: {
        "X-Cart-Key": cartKey,
      },
    });

    mutate();
  }, []);

  const renderCartItem = useMemo(() => {
    if (data == undefined) return null;

    return data.items.map((item) => {
      return (
        <CartItem
          mutate={mutate}
          key={item.id}
          id={item.id}
          variantId={item.variant}
          name={item.variant_name}
          price={item.variant_price}
          quantityOfProduct={item.quantity}
          onDeleteItem={() => handleDeleteCartItem(item.id)}
        />
      );
    });
  }, [data]);

  return (
    <StyledContainer>
      <Headline subTitle="Giỏ Hàng" title="Sản phẩm đã chọn" />

      <Spacing spacing={5} />

      {isEmpty(data?.items) ? (
        <StyledCenter>
          <StyledTitle>Giỏ hàng hiện đang trống</StyledTitle>
        </StyledCenter>
      ) : (
        <Fragment>
          <StyledStack>{renderCartItem}</StyledStack>

          <StyledRight>
            <StyledWrapperPrice>
              <StyledText>Tổng Tiền:</StyledText>

              <StyledPrice value={totalPrice} />
            </StyledWrapperPrice>
            <StyledButton onClick={onRedirect}>{BUTTON.CONTINUE}</StyledButton>
          </StyledRight>
        </Fragment>
      )}
    </StyledContainer>
  );
}

const StyledContainer = styled(Container)(() => {
  return {
    paddingTop: 180,
    paddingBottom: 80,
  };
});

const StyledStack = styled(Stack)(() => {
  return {
    gap: 8,
    height: 550,
    overflowY: "auto",

    ["&::-webkit-scrollbar"]: {
      display: "none",
    },
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  };
});

const StyledRight = styled(Stack)(() => {
  return {
    gap: 16,
    marginTop: 16,
    alignItems: "flex-end",
  };
});

const StyledButton = styled(Button)(() => {
  return {
    textTransform: "capitalize",
  };
});

const StyledWrapperPrice = styled(Stack)(() => {
  return {
    gap: 40,
    alignItems: "center",
    flexDirection: "row",
  };
});

const StyledText = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.p_large,
    fontWeight: 600,
  };
});

const StyledPrice = styled(VNDCurrency)(({ theme }) => {
  return {
    ...theme.typography.h5,
    fontWeight: 700,
    color: theme.palette.primary.main,
  };
});

const StyledCenter = styled(Stack)(() => {
  return {
    alignItems: "center",
    justifyContent: "center",
  };
});

const StyledTitle = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.h4,
    fontWeight: 600,
  };
});
