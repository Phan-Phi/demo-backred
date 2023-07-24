import { useMemo } from "react";
import { Grid } from "@mui/material";

import { PRODUCTS } from "@/interfaces";
import { Box, ButtonBase, CardProductItem, ImageRatio, Stack } from "@/components";

interface Props {
  isExported: boolean;
  id: number;
  logo: string;
  productList: PRODUCTS[];
}

export default function BrandItem({ logo, productList, id, isExported }: Props) {
  const render = useMemo(() => {
    if (productList === undefined) return;

    const data = productList.filter(
      (el) => el.meta.parent.id === id && el.is_exported === isExported
    );

    return data.map((el, idx: number) => {
      if (idx >= 3) return;
      return (
        <Grid item xs={4} key={idx}>
          <CardProductItem id={el.id} title={el.title} imgSrc={el.images[0].value} />
        </Grid>
      );
    });
  }, [productList, isExported]);

  return (
    <Stack justifyContent="center" spacing={2.5}>
      <Stack spacing={2.5}>
        <ImageRatio ratio="960/140" imageProps={{ src: logo, alt: "brand" }} />

        <Stack direction="row" justifyContent="space-between">
          <Grid container spacing={2.5}>
            {render}
          </Grid>
        </Stack>
        <ButtonBase text="Xem Thêm" link="/" />
      </Stack>

      <Box></Box>

      <Box></Box>
    </Stack>
  );
}
