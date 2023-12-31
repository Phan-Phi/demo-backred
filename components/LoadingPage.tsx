import { useEvent } from "react-use";
import { styled } from "@mui/material";
import React, { useCallback } from "react";

import Box from "./Box/Box";
import Image from "./Image";
import Ratio from "./Box/Ratio";
import { COLOR_PALETTE } from "@/configuration";

const LoadingPage = () => {
  const cb = useCallback(() => {
    document.body.removeAttribute("style");
    document.querySelector(".loading-page")?.classList.add("loaded");
    // setTimeout(() => {
    // }, 3000);
  }, []);

  useEvent("load", cb);

  return (
    <LoadingPageContainer className="loading-page">
      <Content className="loading-page__content">
        <Ratio className="loading-page__image" ratio="16/9" width="200px">
          <Image src="/image/Logo.png" alt="logo" />
        </Ratio>
      </Content>
    </LoadingPageContainer>
  );
};

const LoadingPageContainer = styled(Box)(() => {
  return {
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 99,

    width: "100vw",
    height: "100vh",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: COLOR_PALETTE["neutral-950"],

    opacity: 1,
    transition: "700ms",

    ["&.loaded"]: {
      opacity: 0,
      zIndex: -1,
      pointerEvents: "none",

      ["& .loading-page__image"]: {
        animationPlayState: "paused",
      },
    },
  };
});

const Content = styled(Box)(() => {
  return {
    "@keyframes pulse-effect": {
      "0%": {
        opacity: 1,
        transform: "scale(1)",
      },
      "50%": {
        // opacity: 0.8,
        transform: "scale(1.05)",
      },
      "100%": {
        opacity: 1,
        transform: "scale(1)",
      },
    },

    ["& .loading-page__image"]: {
      animation: `pulse-effect 2000ms infinite`,
    },
  };
});

export default LoadingPage;
