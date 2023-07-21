import { useMemo } from "react";
import { styled } from "@mui/material";
import { useWindowScroll } from "react-use";

import { Box } from "@/components";
import { useMedia } from "@/hooks";
import { NAVBAR_ROUTES } from "@/routes";
import ContentHeader from "./components/ContentHeader";

interface WrapperProps {
  scroll: number;
}

export default function Header() {
  const { isMdUp } = useMedia();
  const { y } = useWindowScroll();

  const renderNavBar = useMemo(() => {
    if (isMdUp) {
      return (
        <>
          <ContentHeader />
        </>
      );
    } else {
      return <Box>{/* <AppBarHeader /> */}</Box>;
    }
  }, [NAVBAR_ROUTES, isMdUp]);

  return <Wrapper scroll={y}>{renderNavBar}</Wrapper>;
}

const Wrapper = styled(Box, {
  shouldForwardProp: (propName) => {
    return propName !== "scroll";
  },
})<WrapperProps>(({ theme, scroll }) => {
  return {
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 10,
    padding: "1.5rem 0",
    transition: "1s ease",

    background: scroll > 80 ? "rgba(38, 38, 38, 0.8)" : "rgba(38, 38, 38, 0)",
    backdropFilter: scroll > 80 ? "blur(5px)" : "blur(0)",
    boxShadow: scroll > 80 ? "rgba(0, 0, 0, 0.24) 0px 3px 8px" : "none",
  };
});
