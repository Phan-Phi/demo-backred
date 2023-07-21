import React from "react";

import { Box, Container, styled } from "@mui/material";

import { Hero } from "@/compositions";
import { Spacing } from "@/components";
import FormContact from "./components/FormContact";
import Information from "./components/Information";

import { useSetting } from "@/hooks";

export default function Contact() {
  const setting = useSetting();

  return (
    <StyledWrapper className="contact">
      <StyledContainer>
        <Hero
          subTitle="Liên Lạc"
          title="Để lại lời nhắn"
          img="/image/about-section.png"
        />

        <FormContact />

        <Spacing spacing={5} />

        <Information />
      </StyledContainer>
    </StyledWrapper>
  );
}

const StyledWrapper = styled(Box)(() => {
  return {};
});

const StyledContainer = styled(Container)(() => {
  return {
    paddingTop: 80,
    paddingBottom: 80,
  };
});
