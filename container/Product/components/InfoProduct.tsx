import React, { useCallback, useEffect, useMemo, useState } from "react";

import useSWR from "swr";
import { get } from "lodash";
import { Box, Button, Stack, Typography, styled } from "@mui/material";

import Variant from "./Variant";
import { RenderHTML } from "@/compositions";
import { CounterInput, SVG, VNDCurrency } from "@/components";

import {
  PRODUCTS,
  CART_ITEM_TYPE,
  responseSchema,
  PRODUCTS_VARIANTS,
} from "@/interfaces";

import { BUTTON } from "@/constants";
import { CART_ITEM_API } from "@/apis";
import axiosConfig from "../../../axios.config";
import { useCart, useNotification } from "@/hooks";

type CURRENT_VARIANT_TYPE = {
  id: number;
  price: string;
  name: string;
};

type InfoProductProps = {
  dataProduct: PRODUCTS;
  dataVariants: PRODUCTS_VARIANTS[];
};

export default function InfoProduct(props: InfoProductProps) {
  const { dataProduct, dataVariants } = props;

  const unitProduct = get(dataProduct, "unit");
  const titleProduct = get(dataProduct, "title");
  const dataDesc = get(dataProduct, "description");

  const { cartKey, fetcher, isExported } = useCart();
  const { enqueueSnackbar } = useNotification();

  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [indexVariant, setIndexVariant] = useState(0);
  const [currentVariant, setCurrentVariant] = useState<CURRENT_VARIANT_TYPE>();

  const { data, mutate } = useSWR<responseSchema<CART_ITEM_TYPE>>(CART_ITEM_API, fetcher);

  useEffect(() => {
    if (dataVariants == undefined) return;

    let newObj = {
      id: dataVariants[0].id,
      price: dataVariants[0].price,
      name: dataVariants[0].name,
    };

    setIndexVariant(0);
    setCurrentVariant(newObj);
  }, [dataVariants]);

  // Handler
  const handleGetCurrentVariant = useCallback(
    (index: number, obj: { id: number; price: string; name: string }) => () => {
      setIndexVariant(index);
      setCurrentVariant(obj);
    },
    []
  );

  const handleAddToCart = useCallback(async () => {
    if (currentVariant == undefined) return;

    if (data == undefined) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    const isExisted = data.items.some((item) => {
      return item.variant === currentVariant.id;
    });

    if (isExisted) {
      const currentCartItem = data.items.filter(
        (item) => item.variant === currentVariant.id
      );

      const idOfCartItem = currentCartItem[0].id;
      const quantityOfCartItem = currentCartItem[0].quantity;

      let updateData = {
        quantity: quantityOfCartItem + quantity,
      };

      await axiosConfig.patch(`${CART_ITEM_API}${idOfCartItem}`, updateData, {
        headers: {
          "X-Cart-Key": cartKey,
        },
      });
    } else {
      let data = {
        variant: currentVariant.id,
        quantity: quantity,
      };

      await axiosConfig.post(CART_ITEM_API, data, {
        headers: {
          "X-Cart-Key": cartKey,
        },
      });
    }

    mutate();

    enqueueSnackbar("", { variant: "addToCart" });
  }, [currentVariant, quantity, cartKey, data]);

  // Render
  const renderDesc = useMemo(() => {
    if (dataDesc == undefined) return null;

    return dataDesc.map((item, index) => {
      return <RenderHTML key={index} data={item.value} />;
    });
  }, [dataDesc]);

  const renderVariant = useMemo(() => {
    if (dataVariants == undefined) return null;

    return dataVariants.map((item, index) => {
      const { name, id, price } = item;

      let newObj = {
        id,
        price,
        name,
      };

      return (
        <Variant
          key={index}
          onClick={handleGetCurrentVariant(index, newObj)}
          checked={index === indexVariant ? true : false}
        >
          {name}
        </Variant>
      );
    });
  }, [dataVariants, indexVariant]);

  if (dataVariants == undefined) return null;

  return (
    <StyledWrapperInfo>
      <Stack gap="8px">
        <StyledTitle className="product-detail__title">{titleProduct || ""}</StyledTitle>

        <StyledSubTitle className="product-detail__sub-title">
          {unitProduct || ""}
        </StyledSubTitle>

        <StyledPrice
          className="product-detail__price"
          value={parseFloat(currentVariant?.price as string)}
        />
      </Stack>

      <Stack gap="12px">
        <StyledText className="product-detail__text">Mô Tả</StyledText>

        {renderDesc}
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
          <CounterInput value={quantity} onValueChange={setQuantity} />
        </WrapperCounterInput>
      </Stack>

      {isExported ? (
        <StyledButton>Liên Hệ</StyledButton>
      ) : (
        <StyledButton
          isLoading={isLoading}
          onClick={handleAddToCart}
          endIcon={isLoading ? <ShoppingCartIcon /> : null}
        >
          {isLoading ? BUTTON.BOUGHT : BUTTON.BUY}
        </StyledButton>
      )}
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
    color: theme.palette.text.primary,
  };
});

const StyledSubTitle = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.p_medium,
    fontWeight: 600,
    color: theme.palette.secondary.light,
  };
});

const StyledPrice = styled(VNDCurrency)(({ theme }) => {
  return {
    ...theme.typography.h4,
    fontWeight: 700,
    color: theme.palette.text.primary,
  };
});

const StyledText = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.p_medium,
    fontWeight: 600,
    color: theme.palette.text.primary,
  };
});

const WrapperCounterInput = styled(Box)(() => {
  return {
    width: "fit-content",
  };
});

const StyledButton = styled(Button, {
  shouldForwardProp: (propName) => propName !== "isLoading",
})<{ isLoading?: boolean }>(({ isLoading }) => {
  return {
    minHeight: 43,
    textTransform: "none",

    ["& .MuiButton-endIcon"]: {
      marginTop: 4,
    },

    ...(isLoading && {
      cursor: "default",
      pointerEvents: "none",
    }),
  };
});
