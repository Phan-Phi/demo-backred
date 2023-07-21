import { useMemo } from "react";
import { Container, styled } from "@mui/material";

import { Box, Headline } from "@/components";
import CategoryItemSection from "./CategoryItemSection";
import { NewsPage, NewsDetailPage, NewsListingPage } from "@/interfaces";

interface Props {
  newsData: NewsPage[];
  newsDetailData: NewsDetailPage[];
  newsListingData: NewsListingPage;
}

export default function CategorySection({
  newsData,
  newsDetailData,
  newsListingData,
}: Props) {
  const { title } = newsListingData;
  const renderCategoryItem = useMemo(() => {
    return newsDetailData.map((el, idx) => {
      return (
        <CategoryItemSection key={idx} data={newsData} id={el.id} title={el.title} />
      );
    });
  }, [newsData, newsDetailData]);

  return (
    <StyledContainer>
      <WrapperHeadline>
        <Headline subTitle={title} />
      </WrapperHeadline>

      {renderCategoryItem}
    </StyledContainer>
  );
}

const StyledContainer = styled(Container)(({ theme }) => {
  return {
    marginTop: "80px",
  };
});

const WrapperHeadline = styled(Box)(({ theme }) => {
  return {
    marginBottom: "20px",
  };
});
