import React from "react";
import { Skeleton, Stack, styled, useTheme } from "@mui/material";

export default function CardProductPlaceholder() {
  const theme = useTheme();

  return (
    <StyledWrapper className="card-placeholder">
      <Skeleton
        height={250}
        animation="wave"
        variant="rounded"
        sx={{ bgcolor: "#3C3C3C" }}
      />

      <Skeleton
        variant="rounded"
        height={20}
        animation="wave"
        sx={{ bgcolor: "#3C3C3C" }}
      />

      <Skeleton
        variant="rounded"
        height={20}
        animation="wave"
        sx={{ bgcolor: "#3C3C3C" }}
      />
    </StyledWrapper>
  );
}

const StyledWrapper = styled(Stack)(() => {
  return {
    gap: 16,
    padding: "1rem",
    borderRadius: 8,

    overflow: "hidden",
    border: "0.3px solid #fff",
    backgroundColor: "#262626",
  };
});
