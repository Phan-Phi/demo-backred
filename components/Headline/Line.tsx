import React from "react";
import { Box, BoxProps, styled } from "@mui/material";

export default function Line(props: BoxProps) {
  return <StyledLine {...props} />;
}

const StyledLine = styled(Box)(({ theme }) => {
  return {
    height: 3,
    width: 60,
    backgroundColor: theme.palette.primary.main,
  };
});
