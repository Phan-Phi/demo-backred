import React from "react";

import { Box, Container, styled } from "@mui/material";

import { Hero } from "@/compositions";
import { Spacing } from "@/components";
import FormContact from "./components/FormContact";
import Information from "./components/Information";
import { CONTACT_PAGE_TYPE, IPage, responseSchema } from "@/interfaces";
import { get } from "lodash";

export type ContactProps = IPage<[responseSchema<CONTACT_PAGE_TYPE>]>;

export default function Contact(props: ContactProps) {
  const data = get(props, "initData[0].items[0]");

  const subTitle = get(data, "subtitle");
  const title = get(data, "title");
  const imgSrc = get(data, "banner");

  if (data == undefined) return null;

  return (
    <StyledWrapper className="contact">
      {/* <Hero subTitle={`${title}`} title={`${subTitle}`} img={imgSrc} /> */}

      <StyledContainer>
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
