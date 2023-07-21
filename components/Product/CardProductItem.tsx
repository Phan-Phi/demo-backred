import { useRouter } from "next/router";
import React, { useCallback } from "react";

import { get } from "lodash";
import { Stack, Typography, styled } from "@mui/material";

import ImageRatio from "../Box/ImageRatio";
import VNDCurrency from "../NumberFormat/VNDCurrency";

import { useFetch } from "@/hooks";
import { transformUrl } from "@/libs";
import { PRODUCTS_VARIANTS_API } from "@/apis";
import { PRODUCTS_VARIANTS } from "@/interfaces";
import { CARD_PRODUCT_BOX_SHADOW, CARD_PRODUCT_IMG_RATIO } from "@/constants";

type CardProductItemProps = {
  id: number;
  title: string;
  imgSrc: string;
};

export default function CardProductItem(props: CardProductItemProps) {
  const { id, title, imgSrc } = props;

  const router = useRouter();

  const onRedirect = useCallback(
    (href: string) => () => {
      router.push(href);
    },
    []
  );

  const { data } = useFetch<PRODUCTS_VARIANTS>(
    transformUrl(PRODUCTS_VARIANTS_API, {
      product: id,
    })
  );

  const price: any = get(data, "0.price");

  if (data == undefined) return null;

  return (
    <StyledWrapper className="card-product" onClick={onRedirect(`/product/${id}`)}>
      <ImageRatio
        ratio={CARD_PRODUCT_IMG_RATIO}
        imageProps={{ alt: title, src: imgSrc }}
      />

      <StyledTitle className="car-product__title">{title}</StyledTitle>

      <StyledPrice className="card-product__price" value={parseFloat(price)} />
    </StyledWrapper>
  );
}

const StyledWrapper = styled(Stack)(() => {
  return {
    gap: 8,
    borderRadius: 8,
    padding: "1rem",
    border: "0.3px solid #fff",

    cursor: "pointer",
    boxShadow: CARD_PRODUCT_BOX_SHADOW,
  };
});

const StyledTitle = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.h6,
    fontWeight: 700,
    color: "#fff",

    minHeight: 28 * 2,
    overflow: "hidden",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
  };
});

const StyledPrice = styled(VNDCurrency)(({ theme }) => {
  return {
    ...theme.typography.p_medium,
    color: "#fff",
  };
});
