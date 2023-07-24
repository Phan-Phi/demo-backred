import React, { useEffect, useState } from "react";

import { get } from "lodash";
import { Box, Container, Grid, styled } from "@mui/material";

import { Hero } from "@/compositions";
import { Spacing } from "@/components";
import Carousel from "./components/Carousel";
import InfoProduct from "./components/InfoProduct";
import RelatedProduct from "./components/RelatedProduct";

import {
  IPage,
  PRODUCTS,
  responseSchema,
  PRODUCTS_VARIANTS,
  PRODUCT_CATEGORY_LISTING_TYPE,
} from "@/interfaces";

export type ProductDetailProps = IPage<
  [
    responseSchema<PRODUCT_CATEGORY_LISTING_TYPE>,
    PRODUCTS,
    responseSchema<PRODUCTS_VARIANTS>,
  ]
>;

export type IMAGES_TYPE = {
  block_type: string;
  value: string;
};

export default function ProductDetail(props: ProductDetailProps) {
  const dataBanner = get(props, "initData[0].items");
  const currentProduct = get(props, "initData[1]");
  const productVariants = get(props, "initData[2].items");

  const productId = get(currentProduct, "id");
  const parentId = get(currentProduct, "meta.parent.id");

  const [images, setImages] = useState<IMAGES_TYPE[]>([]);

  useEffect(() => {
    if (currentProduct == undefined || productVariants == undefined) return;

    const imagesProduct = get(currentProduct, "images");

    let arrImagesVariants: IMAGES_TYPE[] = [];

    productVariants.map((item) => {
      item.images.map((el) => {
        arrImagesVariants.push(el);
      });
    });

    let mergeArr = [...imagesProduct, ...arrImagesVariants];

    setImages(mergeArr);
  }, [productVariants, currentProduct]);

  if (
    dataBanner == undefined ||
    productVariants == undefined ||
    currentProduct == undefined
  )
    return null;

  return (
    <StyledWrapper className="product-detail">
      {/* <Hero
        ratio="1200/740"
        img={dataBanner[0].banner}
        subTitle="Sản phẩm"
        title="Chi tiết sản phẩm"
      /> */}

      <StyledContainer>
        <Grid container spacing="40px">
          <Grid item xs={6}>
            <Carousel data={images} />
          </Grid>

          <Grid item xs={6}>
            <InfoProduct dataProduct={currentProduct} dataVariants={productVariants} />
          </Grid>
        </Grid>

        <Spacing spacing={5} />

        <RelatedProduct idCurrentProduct={productId} parentId={parentId} />
      </StyledContainer>
    </StyledWrapper>
  );
}

const StyledWrapper = styled(Box)(() => {
  return {};
});

const StyledContainer = styled(Container)(() => {
  return {
    paddingTop: 80,
    paddingBottom: 80,
  };
});
