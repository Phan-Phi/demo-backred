import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import React, { useMemo } from "react";

import { Box, styled } from "@mui/material";

import { IMAGES_TYPE } from "../ProductDetail";
import { PRODUCT_DETAIL_IMG_RATIO } from "@/constants";
import { ImageRatio, NextArrow, PrevArrow } from "@/components";

const settings = {
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  infinite: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

type CarouselProps = {
  data: IMAGES_TYPE[];
};

export default function Carousel({ data }: CarouselProps) {
  const renderImg = useMemo(() => {
    if (data == undefined) return null;

    return data.map((item, index) => {
      return (
        <ImageRatio
          key={index}
          ratio={PRODUCT_DETAIL_IMG_RATIO}
          boxProps={{ sx: { pointerEvents: "none" } }}
          imageProps={{ src: item.value, alt: "alt" }}
        />
      );
    });
  }, [data]);

  return (
    <StyledWrapper>
      <Slider {...settings}>{renderImg}</Slider>
    </StyledWrapper>
  );
}

const StyledWrapper = styled(Box)(() => {
  return {};
});
