import React from "react";
import { Typography, styled } from "@mui/material";

export default function PrevButton() {
  return <StyledButton>Trước</StyledButton>;
}

const StyledButton = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.p_small,
    cursor: "pointer",
  };
});
