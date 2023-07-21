import React, { useCallback, useMemo, useState } from "react";
import { Box, Button, Stack, Typography, styled } from "@mui/material";

import Variant from "./Variant";
import { CounterInput, SVG, VNDCurrency } from "@/components";

import { BUTTON } from "@/constants";
import { useNotification } from "@/hooks";

const fake_data = [
  {
    id: 1,
    name: "Nhân Trứng",
  },
  {
    id: 1,
    name: "Nhân Bò",
  },
  {
    id: 1,
    name: "Nhân Cá",
  },
  {
    id: 1,
    name: "Nhân Heo",
  },
];

export default function InfoProduct() {
  const [quantity, setQuantity] = useState(1);
  const [currentVariant, setCurrentVariant] = useState(0);
  const { enqueueSnackbarWithSuccess } = useNotification();
  const [isLoading, setIsLoading] = useState(false);

  const handleGetCurrentVariant = useCallback(
    (index: number) => () => {
      setCurrentVariant(index);
    },
    []
  );

  const renderVariant = useMemo(() => {
    if (fake_data == undefined) return null;

    return fake_data.map((item, index) => {
      return (
        <Variant
          key={index}
          onClick={handleGetCurrentVariant(index)}
          checked={index === currentVariant ? true : false}
        >
          {item.name}
        </Variant>
      );
    });
  }, [fake_data, currentVariant]);

  const handleAddToCart = useCallback(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    // enqueueSnackbarWithSuccess("Thêm sản phẩm vào giỏ hàng thành công");
  }, []);

  return (
    <StyledWrapperInfo>
      <Stack gap="8px">
        <StyledTitle className="product-detail__title">
          Cá Viên Nhân Sốt Mayonnaise
        </StyledTitle>

        <StyledSubTitle className="product-detail__sub-title">
          12 viên / hộp
        </StyledSubTitle>

        <StyledPrice className="product-detail__price" value={35000} />
      </Stack>

      <Stack gap="12px">
        <StyledText className="product-detail__text">Mô Tả</StyledText>

        <StyledDesc>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
          Ipsum has been the industry standard dummy text ever since the 1500s, when an
          unknown printer took a galley of type and scrambled it to make a type specimen
          book. It has survived not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in the 1960s
          with the release of Letraset sheets containing Lorem Ipsum passages, and more
          recently with desktop publishing software like Aldus PageMaker including
          versions of Lorem Ipsum.
        </StyledDesc>
      </Stack>

      <Stack gap="12px">
        <StyledText className="product-detail__text">Phân Loại</StyledText>

        <Stack gap="16px" flexDirection="row" flexWrap="wrap">
          {renderVariant}
        </Stack>
      </Stack>

      <Stack gap="12px">
        <StyledText className="product-detail__text">Số Lượng</StyledText>

        <WrapperCounterInput>
          <CounterInput
            value={quantity}
            onValueChange={setQuantity}
            // onValueChangeDelete={setQuantity}
          />
        </WrapperCounterInput>
      </Stack>

      <StyledButton
        onClick={handleAddToCart}
        endIcon={isLoading ? <ShoppingCartIcon /> : null}
      >
        {isLoading ? BUTTON.BOUGHT : BUTTON.BUY}
      </StyledButton>
    </StyledWrapperInfo>
  );
}

const ShoppingCartIcon = () => {
  return (
    <Box>
      <SVG src="/svg/shoppingCart.svg" />
    </Box>
  );
};

const StyledWrapperInfo = styled(Stack)(() => {
  return {
    gap: 40,
  };
});

const StyledTitle = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.h6,
    fontWeight: 700,
  };
});

const StyledSubTitle = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.p_medium,
    fontWeight: 600,
    color: "#676767",
  };
});

const StyledPrice = styled(VNDCurrency)(({ theme }) => {
  return {
    ...theme.typography.h4,
    fontWeight: 700,
    color: "#fff",
  };
});

const StyledText = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.p_medium,
    fontWeight: 600,
  };
});

const StyledDesc = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.p_small,
    fontWeight: 500,
  };
});

const WrapperCounterInput = styled(Box)(() => {
  return {
    width: "fit-content",
  };
});

const StyledButton = styled(Button)(() => {
  return {
    textTransform: "none",
    minHeight: 43,

    ["& .MuiButton-endIcon"]: {
      marginTop: 4,
    },
  };
});
