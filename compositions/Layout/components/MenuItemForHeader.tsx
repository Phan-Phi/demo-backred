import { useMemo } from "react";
import { Typography, styled } from "@mui/material";

import SubMenuItem from "./SubMenuItem";
import { NAVBAR_ROUTES } from "@/routes";
import { Box, ExpandMoreIcon, Link, Stack } from "@/components";

export default function MenuItemForHeader() {
  const renderMeunuItem = useMemo(() => {
    return NAVBAR_ROUTES.map((el: any, idx: number) => {
      if (el.key === "product") {
        return (
          <StyledBox key={idx}>
            <MenuHeader variant="centerCenter">
              <TextMenuItem variant="menu_header">{el.name}</TextMenuItem>
              {/* <ExpandMoreIcon
                sx={{
                  transform: "rotate(0deg)",
                }}
              /> */}
            </MenuHeader>

            <SubMenuItem />
          </StyledBox>
        );
      }
      return (
        <Link href={el.link} key={idx}>
          <MenuHeader variant="centerCenter">
            <TextMenuItem variant="menu_header">{el.name}</TextMenuItem>
          </MenuHeader>
        </Link>
      );
    });
  }, []);
  return <WrapperMenuHeader columnGap={2.5}>{renderMeunuItem}</WrapperMenuHeader>;
}

const StyledBox = styled(Box)(({ theme }) => {
  return {
    position: "relative",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",

    "&:hover .submenu1": {
      transform: "rotate3d(0,0,0,0deg)",
    },
  };
});

const WrapperMenuHeader = styled(Stack)(({ theme }) => {
  return {
    flexDirection: "row",
    justifyContent: "center",
  };
});

const MenuHeader = styled(Stack)(({ theme }) => {
  return {
    flexDirection: "row",

    "& .MuiSvgIcon-root": {
      transform: "rotate(90deg)",
      color: theme.palette.common.white,
    },
  };
});

const TextMenuItem = styled(Typography)(({ theme }) => {
  return {
    color: theme.palette.common.white,
    transition: "all .4s ease",
    fontWeight: 700,

    "&:hover": {
      color: theme.palette.primary.main,
    },
  };
});
