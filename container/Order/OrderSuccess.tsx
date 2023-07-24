import React from "react";
import { useRouter } from "next/router";

import { styled, Container, Stack, Typography, Box, Button } from "@mui/material";

export default function OrderSuccess() {
  const router = useRouter();

  return (
    <StyledContainer>
      <StyledCenter>
        <StyledTitle>Đặt Hàng Thành Công</StyledTitle>

        <Box>Check</Box>

        <StyledDesc>
          Chúng tôi sẽ liên hệ để xử lý đơn hàng trong thời gian sớm nhất
        </StyledDesc>

        <StyledButton onClick={() => router.push("/")}>Trở Về Trang Chủ</StyledButton>
      </StyledCenter>
    </StyledContainer>
  );
}

const StyledContainer = styled(Container)(() => {
  return {
    paddingTop: 220,
    paddingBottom: 80,
  };
});

const StyledCenter = styled(Stack)(() => {
  return {
    gap: 40,
    alignItems: "center",
    justifyContent: "center",
  };
});

const StyledTitle = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.BungeeText,
    textTransform: "uppercase",
  };
});

const StyledDesc = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.p_medium,
  };
});

const StyledButton = styled(Button)(() => {
  return {
    textTransform: "capitalize",
  };
});
