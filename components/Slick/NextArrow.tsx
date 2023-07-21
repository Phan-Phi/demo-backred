import React from "react";
import { CustomArrowProps } from "react-slick";

import { styled } from "@mui/material";
import { Box, SVG } from "@/components";

export default function NextArrow(props: CustomArrowProps) {
  const { className, onClick } = props;

  return (
    <StyledWrapper className={className} onClick={onClick}>
      <SVG src="/svg/nextArrow.svg" />
    </StyledWrapper>
  );
}

const StyledWrapper = styled(Box)(() => {
  return {
    ["&::before"]: {
      display: "none",
    },

    ["&.slick-next"]: {
      top: "100%",
      right: "42%",
      transform: "translate(0, 0)",
    },
  };
});
