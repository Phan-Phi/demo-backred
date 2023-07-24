import { get } from "lodash";
import dynamic from "next/dynamic";

import { Container } from "@mui/material";
import { useCart, useSetting } from "@/hooks";
import { Hero, RenderContent } from "@/compositions";
import { Box, Headline, ImageRatio, SEO } from "@/components";
import { IPage, AboutPage, responseSchema } from "@/interfaces";
import { getSeoObject } from "@/libs";

// const AboutCertificates = dynamic(import("./components/AboutCertificates"), {
//   ssr: false,
// });

export type AboutPageProps = IPage<[responseSchema<AboutPage>]>;

export default function About(props: AboutPageProps) {
  const { logo } = useSetting();
  const { isExported } = useCart();

  const data = get(props, "initData[0].items[0]");
  const { title, subtitle, histories, export_certificates, local_certificates, meta } =
    data;

  return (
    <Box>
      <SEO {...getSeoObject(meta)} />

      {/* <Hero
        ratio="1200/740"
        img="/image/home-banner.png"
        title={subtitle}
        subTitle={title}
      /> */}

      <Container>
        <Box sx={{ width: "20%", margin: "0 auto", padding: "1rem 0" }}>
          <ImageRatio ratio="276/276" imageProps={{ src: logo }} />
        </Box>

        <RenderContent data={histories} />

        <Box sx={{ marginTop: "2.5rem" }}>
          {/* <Headline subTitle="THÀNH TÍCH ĐẠT ĐƯỢC" title="Chứng nhận & Chứng chỉ" /> */}

          {/* {isExported === null ? null : (
            <AboutCertificates
              isExported={isExported}
              export_certificates={export_certificates}
              local_certificates={local_certificates}
            />
          )} */}
        </Box>
      </Container>
    </Box>
  );
}

// export {};
