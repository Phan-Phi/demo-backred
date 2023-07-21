import React from "react";
import { Button, styled, CircularProgress } from "@mui/material";

export default function LoadingButton() {
  return <StyledButton startIcon={<Loading />}>Đang xử lý...</StyledButton>;
}

const Loading = () => {
  return <CircularProgress sx={{ color: "white" }} size={16} />;
};

const StyledButton = styled(Button)(() => {
  return {
    userSelect: "none",
    pointerEvents: "none",
    textTransform: "capitalize",
  };
});
