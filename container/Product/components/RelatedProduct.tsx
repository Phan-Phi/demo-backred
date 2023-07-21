import React, { useMemo } from "react";

import { Box, Grid, styled } from "@mui/material";

import { CardProductItem, Headline, Spacing } from "@/components";

export default function RelatedProduct() {
  const renderProducts = useMemo(() => {
    return Array(4)
      .fill(0)
      .map((item, index) => {
        return (
          <Grid item xs={3} key={index}>
            {/* <CardProductItem href="/product/1" /> */}
          </Grid>
        );
      });
  }, []);

  return (
    <StyledWrapper className="related-product">
      <Headline subTitle="sản phẩm khác" title="Sản phẩm cùng danh mục" />

      <Spacing spacing={5} />

      <Grid container spacing="40px">
        {renderProducts}
      </Grid>
    </StyledWrapper>
  );
}

const StyledWrapper = styled(Box)(() => {
  return {};
});
