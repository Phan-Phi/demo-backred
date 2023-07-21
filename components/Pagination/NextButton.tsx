import React from "react";
import { Typography, styled } from "@mui/material";

export default function NextButton() {
  return <StyledButton>Tiếp</StyledButton>;
}

const StyledButton = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.p_small,
    cursor: "pointer",
  };
});
