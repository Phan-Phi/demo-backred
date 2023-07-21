import { get } from "lodash";
import { Container } from "@mui/material";

import { Box, Headline } from "@/components";
import { Hero, RenderContent } from "@/compositions";
import { IPage, AboutPage, responseSchema } from "@/interfaces";

export type AboutPageProps = IPage<[responseSchema<AboutPage>]>;

export default function About(props: AboutPageProps) {
  const data = get(props, "initData[0].items[0]");
  const { title, subtitle, histories, export_certificates, local_certificates } = data;

  return (
    <Box>
      <Hero
        ratio="1200/740"
        img="/image/home-banner.png"
        title={subtitle}
        subTitle={title}
      />

      <Container>
        <RenderContent data={histories} />

        <Headline subTitle="THÀNH TÍCH ĐẠT ĐƯỢC" title="Chứng nhận & Chứng chỉ" />
      </Container>
    </Box>
  );
}
