import { useRouter } from "next/router";
import React, { useCallback, useMemo } from "react";

import { Container, styled, Stack, Button, Typography } from "@mui/material";

import { CartItem, Headline, Spacing, VNDCurrency } from "@/components";

import { useCart } from "@/hooks";
import { ROUTES } from "@/routes";
import { BUTTON } from "@/constants";

const fake_data = [
  {
    id: 1,
    name: "Kem",
    price: 1000,
    quantityOfProduct: 4,
  },
  {
    id: 2,
    name: "Bánh",
    price: 250,
    quantityOfProduct: 4,
  },
  {
    id: 3,
    name: "Trà",
    price: 9999,
    quantityOfProduct: 4,
  },
  {
    id: 4,
    name: "Gạo",
    price: 100230,
    quantityOfProduct: 4,
  },
  {
    id: 5,
    name: "Gạo",
    price: 100230,
    quantityOfProduct: 4,
  },
];

export default function Cart() {
  const router = useRouter();
  const { cart, totalPrice } = useCart();

  const onRedirect = useCallback(() => {
    router.push(`/${ROUTES.order}`);
  }, []);

  const renderCartItem = useMemo(() => {
    if (fake_data == undefined) return null;

    return fake_data.map((item) => {
      return (
        <CartItem
          key={item.id}
          id={item.id}
          name={item.name}
          price={item.price}
          quantityOfProduct={item.quantityOfProduct}
          onDeleteItem={() => {}}
        />
      );
    });
  }, [fake_data]);

  return (
    <StyledContainer>
      <Headline subTitle="Giỏ Hàng" title="Sản phẩm đã chọn" />

      <Spacing spacing={5} />

      <StyledStack>{renderCartItem}</StyledStack>

      <StyledRight>
        <StyledWrapperPrice>
          <StyledText>Tổng Tiền:</StyledText>

          <StyledPrice value={170000} />
        </StyledWrapperPrice>
        <StyledButton onClick={onRedirect}>{BUTTON.CONTINUE}</StyledButton>
      </StyledRight>
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
