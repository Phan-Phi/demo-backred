import { useCallback, useEffect, useState } from "react";
import { Button, Modal, Typography, styled } from "@mui/material";

import { Box, Stack } from "@/components";
import { useCart } from "@/hooks";

import { CART_API } from "@/apis";
import axiosConfig from "../../axios.config";

export default function VatModal() {
  const { setIsExported, setCartKey, cartKey } = useCart();
  const [open, setOpen] = useState(true);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleExported = useCallback(() => {
    setIsExported(true);
    setOpen(false);
  }, []);

  const handleNotExported = useCallback(() => {
    setIsExported(false);
    setOpen(false);
  }, []);

  useEffect(() => {
    if (cartKey) {
      return;
    } else {
      axiosConfig
        .get(CART_API)
        .then((response) => setCartKey(response.headers["x-cart-key"]));
    }
  }, [cartKey]);

  return (
    <StyledModal
      open={open}
      // onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Wrapper>
        <Title variant="p_large">Chào mừng đến với Đen Đỏ</Title>
        <SubTitle variant="h3">Bạn đang quan tâm đến mặt hàng nào?</SubTitle>

        <WrapperButton direction="row">
          <StyledButton variant="outlined" onClick={handleExported}>
            Hàng Xuất Khẩu
          </StyledButton>
          <StyledButton variant="outlined" onClick={handleNotExported}>
            Hàng Nội Địa
          </StyledButton>
        </WrapperButton>
      </Wrapper>
    </StyledModal>
  );
}

const StyledModal = styled(Modal)(() => {
  return {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
});

const Wrapper = styled(Box)(({ theme }) => {
  return {
    background: theme.palette.secondary.main,
    padding: "2.5rem",
    borderRadius: "0.5rem",
  };
});

const WrapperButton = styled(Stack)(() => {
  return {
    marginTop: "2.5rem",
    justifyContent: "space-evenly",
  };
});

const Title = styled(Typography)(() => {
  return { fontWeight: 600 };
});

const SubTitle = styled(Typography)(() => {
  return {
    fontWeight: 700,
  };
});

const StyledButton = styled(Button)(() => {
  return {
    width: "160px",
  };
});
