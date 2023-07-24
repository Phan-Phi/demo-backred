import React, { useMemo } from "react";

import { Box, Grid, styled } from "@mui/material";

import { CardProductItem, Headline, Spacing } from "@/components";

import { transformUrl } from "@/libs";
import { PRODUCTS } from "@/interfaces";
import { useCart, useFetch } from "@/hooks";
import { PAGES_API, TYPE_PARAMS } from "@/apis";

type RelatedProductProps = {
  parentId: number;
  idCurrentProduct: number;
};

export default function RelatedProduct({
  parentId,
  idCurrentProduct,
}: RelatedProductProps) {
  const { isExported } = useCart();

  const { data } = useFetch<PRODUCTS>(
    transformUrl(PAGES_API, {
      limit: 8,
      offset: "0",
      fields: "*",
      is_exported: isExported,
      descendant_of: parentId,
      type: TYPE_PARAMS["product.ProductPage"],
    })
  );

  const filterData = data?.filter((item) => item.id !== idCurrentProduct);

  const renderProducts = useMemo(() => {
    if (filterData == undefined) return null;

    return filterData.slice(0, 4).map((item, index) => {
      return (
        <Grid item xs={3} key={index}>
          <CardProductItem
            id={item.id}
            title={item.title}
            imgSrc={item.images[0].value}
          />
        </Grid>
      );
    });
  }, [filterData]);

  if (data == undefined) return null;

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
