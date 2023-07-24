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
        sx={{ bgcolor: theme.palette.skeleton.main }}
      />

      <Skeleton
        variant="rounded"
        height={20}
        animation="wave"
        sx={{ bgcolor: theme.palette.skeleton.main }}
      />

      <Skeleton
        variant="rounded"
        height={20}
        animation="wave"
        sx={{ bgcolor: theme.palette.skeleton.main }}
      />
    </StyledWrapper>
  );
}

const StyledWrapper = styled(Stack)(({ theme }) => {
  return {
    gap: 16,
    padding: "1rem",
    borderRadius: 8,

    overflow: "hidden",
    border: `0.3px solid ${theme.palette.text.primary}`,
  };
});
