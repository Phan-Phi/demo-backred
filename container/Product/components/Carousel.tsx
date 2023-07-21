import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import React, { useMemo } from "react";

import { Box, styled } from "@mui/material";

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

const fake_data = [
  {
    id: 1,
    imgSrc: "/image/cardProduct.png",
  },
  {
    id: 2,
    imgSrc: "/image/cardProduct.png",
  },
];

export default function Carousel() {
  const renderImg = useMemo(() => {
    if (fake_data == undefined) return null;

    return fake_data.map((item) => {
      return (
        <ImageRatio
          key={item.id}
          ratio={PRODUCT_DETAIL_IMG_RATIO}
          boxProps={{ sx: { pointerEvents: "none" } }}
          imageProps={{ src: item.imgSrc, alt: "alt" }}
        />
      );
    });
  }, [fake_data]);

  return (
    <StyledWrapper>
      <Slider {...settings}>{renderImg}</Slider>
    </StyledWrapper>
  );
}

const StyledWrapper = styled(Box)(() => {
  return {};
});
