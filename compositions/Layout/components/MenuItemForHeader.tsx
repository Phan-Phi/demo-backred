import { useRouter } from "next/router";
import { Typography, styled } from "@mui/material";

import { useMemo } from "react";
import SubMenuItem from "./SubMenuItem";
import { NAVBAR_ROUTES } from "@/routes";
import { Box, ExpandMoreIcon, Link, Stack } from "@/components";

interface TextMenuItemProps {
  active: boolean;
}

export default function MenuItemForHeader() {
  const { asPath } = useRouter();

  const renderMeunuItem = useMemo(() => {
    return NAVBAR_ROUTES.map((el: any, idx: number) => {
      if (el.key === "brand") {
        return (
          <StyledBox key={idx}>
            <MenuHeader variant="centerCenter">
              <TextMenuItem active={asPath.includes(el.key)} variant="menu_header">
                {el.name}
              </TextMenuItem>
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
            {asPath === "/" ? (
              <TextMenuItem active={idx === 0 ? true : false} variant="menu_header">
                {el.name}
              </TextMenuItem>
            ) : (
              <TextMenuItem active={idx === 0 ? true : false} variant="menu_header">
                {el.name}
              </TextMenuItem>
            )}
          </MenuHeader>
        </Link>
      );
    });
  }, [asPath]);

  return <WrapperMenuHeader columnGap={2.5}>{renderMeunuItem}</WrapperMenuHeader>;
}

const StyledBox = styled(Box)(({ theme }) => {
  return {
    position: "relative",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",

    "&:hover .submenu": {
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

const TextMenuItem = styled(Typography)<TextMenuItemProps>(({ active, theme }) => {
  return {
    color: active ? theme.palette.primary.main : theme.palette.common.white,
    transition: "all .4s ease",
    fontWeight: 700,

    "&:hover": {
      color: theme.palette.primary.main,
    },
  };
});
