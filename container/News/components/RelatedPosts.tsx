import { useRouter } from "next/router";

import { PAGES_API, TYPE_PARAMS } from "@/apis";
import { useFetch } from "@/hooks";
import { transformUrl } from "@/libs";
import { Box, Headline } from "@/components";
import { NewsPage } from "@/interfaces";
import { useMemo } from "react";
import { Grid, styled } from "@mui/material";
import CardNew from "@/compositions/Card/CardNew";

interface Props {
  data: NewsPage[];
  id: number;
}

export default function RelatedPosts({ data, id }: Props) {
  const { query, locale } = useRouter();

  const render = useMemo(() => {
    const newData = data.filter((el) => el.id !== Number(query.id));

    const allFilteredNews = newData
      .slice(0, 3)
      .filter((item) => item.meta.parent.id === id);

    return allFilteredNews.map((el, idx) => {
      return (
        <Grid key={idx} item xs={4}>
          <CardNew data={el} />
        </Grid>
      );
    });
  }, [data]);

  return (
    <Box>
      <Headline subTitle="THÔNG TIN BỔ ÍCH" title="BÀI VIẾT CÙNG DANH MỤC" />

      <StyledBox>
        <Grid container spacing={2.5}>
          {render}
        </Grid>
      </StyledBox>
    </Box>
  );
}

const StyledBox = styled(Box)(({ theme }) => {
  return {
    marginTop: "40px",
  };
});
