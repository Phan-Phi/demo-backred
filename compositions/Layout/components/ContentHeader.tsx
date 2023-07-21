import { useRouter } from "next/router";
import { Container, styled } from "@mui/material";

import Search from "./Search";
import MenuItemForHeader from "./MenuItemForHeader";
import { Box, CartIcon, Image, Link, Stack } from "@/components";
import { useSetting } from "@/hooks";
import DarkMode from "./DarkMode";

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
          <Search />
          <Box>
            <DarkMode />
          </Box>
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
