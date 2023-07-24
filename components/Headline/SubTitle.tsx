import React from "react";
import { Typography, TypographyProps, styled } from "@mui/material";

export default function SubTitle({ children, ...restProps }: TypographyProps) {
  return <StyledSubtitle {...restProps}>{children}</StyledSubtitle>;
}

const StyledSubtitle = styled(Typography)(({ theme }) => {
  return {
    fontSize: 16,
    lineHeight: "24px",
    fontWeight: 600,
    color: theme.palette.text.primary,
    textTransform: "uppercase",
  };
});
