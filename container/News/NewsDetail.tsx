import { get } from "lodash";
import { useMemo } from "react";
import { Container, styled } from "@mui/material";

import { IPage, NewsListingPage, NewsPage, responseSchema } from "@/interfaces";
import { Box, Headline } from "@/components";
import { Hero, RenderHTML } from "@/compositions";
import RelatedPosts from "./components/RelatedPosts";

export type NewsPageProps = IPage<
  [responseSchema<NewsListingPage>, NewsPage, responseSchema<NewsPage>]
>;

export default function NewsDetail(props: NewsPageProps) {
  const newsListingData = get(props, "initData[0].items[0]");

  const newsDetailData = get(props, "initData[1]");
  const listData = get(props, "initData[2].items");

  const { banner } = newsListingData;
  const { title, content, meta } = newsDetailData;

  const renderHTML = useMemo(() => {
    return content.map((el: any, idx: number) => {
      return <RenderHTML key={idx} data={content[0].value} />;
    });
  }, [content]);

  return (
    <Box>
      <Hero ratio="1200/740" img={banner} title={title} />

      <Container>
        <Wrapper>{renderHTML}</Wrapper>

        <RelatedPosts data={listData} id={meta.parent.id} />
      </Container>
    </Box>
  );
}

const Wrapper = styled(Box)(() => {
  return {
    margin: "80px 0",
  };
});
