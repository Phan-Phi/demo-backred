import { useMemo } from "react";
import { Container, Typography, styled, useTheme } from "@mui/material";

import { useCart } from "@/hooks";
import BrandItem from "./BrandItem";
import { Box, Headline } from "@/components";
import {
  PRODUCTS,
  PRODUCT_CATEGORY_DETAIL,
  PRODUCT_CATEGORY_LISTING_TYPE,
} from "@/interfaces";

interface Props {
  productDetailData: PRODUCT_CATEGORY_DETAIL[];
  productData: PRODUCTS[];
  productListingData: PRODUCT_CATEGORY_LISTING_TYPE;
}

export default function BrandSection({
  productDetailData,
  productData,
  productListingData,
}: Props) {
  const { isExported } = useCart();

  const { subtitle, title } = productListingData;

  const renderBrand = useMemo(() => {
    return productDetailData.map((el: any, idx: number) => {
      return (
        <BrandItem
          key={idx}
          isExported={isExported}
          id={el.id}
          logo={el.banner}
          productList={productData}
        />
      );
    });
  }, [productDetailData, productData, isExported]);

  return (
    <Wrapper>
      <StyledBox>
        <WrapperTitle>
          <Headline title={subtitle} subTitle={title} />
        </WrapperTitle>
        {renderBrand}
      </StyledBox>
    </Wrapper>
  );
}

const Wrapper = styled(Container)(({ theme }) => {
  return {
    margin: "80px 0",
  };
});

const StyledBox = styled(Box)(({ theme }) => {
  return {
    padding: "40px",
    backgroundRepeat: "no-repeat",
    backgroundImage: "url(/image/brand-section2-01.png)",
    backgroundSize: "cover",
  };
});

const WrapperTitle = styled(Box)(({ theme }) => {
  return {
    marginBottom: "2.5rem",
  };
});
