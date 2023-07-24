import React, { forwardRef, useCallback } from "react";
import { CustomContentProps, SnackbarContent, useSnackbar } from "notistack";

import SVG from "../SVG";
import Link from "../Link";
import { styled, Typography, Stack, Box } from "@mui/material";

const SnackbarAddToCart = forwardRef<HTMLDivElement, CustomContentProps>(
  ({ id, ...props }, ref) => {
    const { closeSnackbar } = useSnackbar();

    const handleDismiss = useCallback(() => {
      closeSnackbar(id);
    }, [id, closeSnackbar]);

    return (
      <StyledSnackbar ref={ref}>
        <StyledStack>
          <StyledTypography>
            Sản phẩm đã được thêm vào giỏ hàng thành công.
          </StyledTypography>

          <StyledWrapperSVG onClick={handleDismiss}>
            <SVG src="/svg/close.svg" />
          </StyledWrapperSVG>
        </StyledStack>

        <Stack gap="6px">
          <StyledDesc>
            Bạn có thể tiếp tục đặt hàng hoặc di chuyển đến trang giỏ hàng để tiến hành
            đặt hàng.
          </StyledDesc>

          <StyledLink href="/cart">Đến Giỏ Hàng</StyledLink>
        </Stack>
      </StyledSnackbar>
    );
  }
);

SnackbarAddToCart.displayName = "SnackbarSuccess";

export default SnackbarAddToCart;

const StyledSnackbar = styled(SnackbarContent)(() => {
  return {
    borderRadius: "6px",
    padding: "12px 20px",
    border: "1px solid #BBF7D0",
    backgroundColor: "#BBF7D0",
  };
});

const StyledStack = styled(Stack)(() => {
  return {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  };
});

const StyledTypography = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.p_small,
    fontWeight: 700,
    color: "#166534",
  };
});

const StyledWrapperSVG = styled(Box)(() => {
  return {
    width: 20,
    height: 20,
    cursor: "pointer",
  };
});

const StyledDesc = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.p_small,
    color: "#15803D",
  };
});

const StyledLink = styled(Link)(({ theme }) => {
  return {
    ...theme.typography.p_small,
    fontWeight: 700,
    color: "#166534",
  };
});
