import { useRouter } from "next/router";

import Search from "./Search";
import DarkMode from "./DarkMode";
import Language from "./Language";
import { useSetting } from "@/hooks";
import { Container, styled } from "@mui/material";
import MenuItemForHeader from "./MenuItemForHeader";
import { Box, CartIcon, Image, Link, Stack } from "@/components";

export default function ContentHeader() {
  const setting = useSetting();
  const router = useRouter();

  const { logo } = setting;

  if (setting === undefined) return;

  return (
    <Container>
      <WrapperContentTop variant="spaceBetweenCenter" gap={4}>
        <Link href="/">
          <Box position="relative" width={80} height={80}>
            <Image src={logo} alt="" />
          </Box>
        </Link>

        <StyledStack spacing={2} direction="row">
          <Search isTypewriterEffect />
          <DarkMode />
          <Language />

          <Box
            onClick={() => {
              router.push("/cart");
            }}
            sx={{ cursor: "pointer" }}
          >
            <CartIcon />
          </Box>
        </StyledStack>
      </WrapperContentTop>

      <WrapperContentBottom>
        <MenuItemForHeader />
      </WrapperContentBottom>
    </Container>
  );
}

const WrapperContentTop = styled(Stack)(({ theme }) => {
  return {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "1.5rem",
  };
});

const WrapperContentBottom = styled(Container)(({ theme }) => {
  return {};
});

const StyledStack = styled(Stack)(({ theme }) => {
  return { flexGrow: 1, width: "100%", alignItems: "center" };
});
