import React from "react";
import { CustomArrowProps } from "react-slick";

import { styled } from "@mui/material";
import { Box, SVG } from "@/components";

export default function PrevArrow(props: CustomArrowProps) {
  const { className, onClick } = props;

  return (
    <StyledWrapper className={className} onClick={onClick}>
      <SVG src="/svg/prevArrow.svg" />
    </StyledWrapper>
  );
}

const StyledWrapper = styled(Box)(() => {
  return {
    ["&::before"]: {
      display: "none",
    },

    ["&.slick-prev"]: {
      top: "100%",
      left: "42%",
      transform: "translate(0, 0)",
    },
  };
});
