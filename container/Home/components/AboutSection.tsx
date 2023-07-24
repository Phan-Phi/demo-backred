import { Container, Grid, styled } from "@mui/material";

import { useMemo } from "react";
import { useMedia } from "@/hooks";
import { AboutPage, HomePage } from "@/interfaces";
import { RenderHTML } from "@/compositions";
import { ABOUT_SECTION_RATIO } from "@/constants";
import { Ratio, Image, Headline, Stack } from "@/components";

interface Props {
  data: HomePage;
  aboutData: AboutPage;
}

export default function AboutSection({ data, aboutData }: Props) {
  const { title, subtitle } = aboutData;
  const { about_us_content, about_us_images, about_us_title } = data;

  const { isSmDown, isMdDown, isMdUp } = useMedia();

  const device = isMdUp
    ? ABOUT_SECTION_RATIO.desktop
    : isSmDown
    ? ABOUT_SECTION_RATIO.mobile
    : ABOUT_SECTION_RATIO.tablet;

  const device2 = isMdUp
    ? ABOUT_SECTION_RATIO.desktop2
    : isSmDown
    ? ABOUT_SECTION_RATIO.mobile
    : ABOUT_SECTION_RATIO.tablet;

  const renderImage = useMemo(() => {
    return about_us_images.map((el, idx) => {
      return (
        <Grid key={idx} item xs={12} sm={4} md={idx === 0 ? 12 : 6}>
          <Ratio ratio={idx === 0 ? device : device2}>
            <Image
              src={el.value}
              alt=""
              style={{ objectFit: "cover" }}
              className={idx === 0 ? "" : "child"}
            />
          </Ratio>
        </Grid>
      );
    });
  }, [about_us_images, device2, device]);

  return (
    <StyledContainer>
      <StyledGrid container spacing={5}>
        <Grid item xs={12} sm={12} md={6}>
          <Stack spacing={2.3}>
            <Headline title={subtitle} subTitle={title} />

            <StyledContent data={about_us_content} />
          </Stack>
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <Grid container spacing={2.3}>
            {renderImage}
          </Grid>
        </Grid>
      </StyledGrid>
    </StyledContainer>
  );
}

const StyledContainer = styled(Container)(({ theme }) => {
  return {
    paddingTop: "5rem",
    paddingBottom: "5rem",

    "& .ratio": {
      "& .child": {
        objectFit: "cover !important",
      },
    },

    [theme.breakpoints.between("sm", "md")]: {
      "& .ratio": {
        "& img": {
          objectFit: "cover !important",
        },
      },
    },
  };
});

const StyledGrid = styled(Grid)(({ theme }) => {
  return {
    alignItems: "center",
  };
});

const StyledContent = styled(RenderHTML)(({ theme }) => {
  return {
    textAlign: "justify",
    "& p": {
      margin: 0,
    },
  };
});
