import React from "react";

import { Box, Container, Grid, styled } from "@mui/material";

import { Spacing } from "@/components";
import Carousel from "./components/Carousel";
import InfoProduct from "./components/InfoProduct";
import RelatedProduct from "./components/RelatedProduct";

import { IPage, PRODUCTS, responseSchema } from "@/interfaces";

export type ProductDetailProps = IPage<[responseSchema<PRODUCTS>]>;

export default function ProductDetail(props: ProductDetailProps) {
  return (
    <StyledWrapper className="product-detail">
      <Box>Banner</Box>

      <StyledContainer>
        <Grid container spacing="40px">
          <Grid item xs={6}>
            <Carousel />
          </Grid>

          <Grid item xs={6}>
            <InfoProduct />
          </Grid>
        </Grid>

        <Spacing spacing={5} />

        <RelatedProduct />
      </StyledContainer>
    </StyledWrapper>
  );
}

const StyledWrapper = styled(Box)(() => {
  return {};
});

const StyledContainer = styled(Container)(() => {
  return {
    paddingTop: 180,
    paddingBottom: 80,
  };
});
