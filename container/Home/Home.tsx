import { get } from "lodash";
import dynamic from "next/dynamic";

import { Box, SEO } from "@/components";
import { Hero } from "@/compositions";

import Header from "@/compositions/Layout/Header";
import Footer from "@/compositions/Layout/Footer";

import VideoSection from "./components/VideoSection";
import AboutSection from "./components/AboutSection";
import CategorySection from "./components/CategorySection";

import {
  HomePage,
  IPage,
  NewsPage,
  NewsDetailPage,
  NewsListingPage,
  responseSchema,
  PRODUCT_CATEGORY_DETAIL,
  PRODUCTS,
  PRODUCT_CATEGORY_LISTING_TYPE,
} from "@/interfaces";
import { getSeoObject } from "@/libs";
import { useCart, useSetting } from "@/hooks";

const ExportSection = dynamic(import("../Home/components/ExportSection"), { ssr: false });
const VatModal = dynamic(import("../../compositions/Modal/VatModal"), { ssr: false });
const BrandSection = dynamic(import("../Home/components/BrandSection"), { ssr: false });

export type HomePageProps = IPage<
  [
    responseSchema<HomePage>,
    responseSchema<NewsListingPage>,
    responseSchema<NewsDetailPage>,
    responseSchema<NewsPage>,
    responseSchema<PRODUCT_CATEGORY_DETAIL>,
    responseSchema<PRODUCTS>,
    responseSchema<PRODUCT_CATEGORY_LISTING_TYPE>,
  ]
>;

export default function Home(props: HomePageProps) {
  const { initData } = props;
  const setting = useSetting();
  const { isExported, setIsExported } = useCart();

  const data = get(props, "initData[0].items[0]");
  const newsListingData = get(props, "initData[1].items[0]");
  const newsDetailData = get(props, "initData[2].items");
  const newsData = get(props, "initData[3].items");
  const productDetailData = get(props, "initData[4].items");
  const productData = get(props, "initData[5].items");
  const productListingData = get(props, "initData[6].items[0]");

  const { meta, video_cta, video_link, export_cta, local_cta, local_image } = data;

  return (
    <Box>
      <SEO {...getSeoObject(meta)} />
      {isExported === null ? <VatModal /> : null}

      {/* <Header /> */}
      <Hero
        ratio="1200/740"
        img="/image/home-banner.png"
        title="Ăn Thích Mê Ngon Khó Cưỡng"
        isHomePage={true}
      />

      <AboutSection data={data} />

      <VideoSection img="/image/video-section.png" text={video_cta} video={video_link} />

      <ExportSection data={{ export_cta, local_cta, local_image }} />
      {isExported === null ? null : (
        <BrandSection
          productDetailData={productDetailData}
          productData={productData}
          productListingData={productListingData}
        />
      )}

      <CategorySection
        newsData={newsData}
        newsDetailData={newsDetailData}
        newsListingData={newsListingData}
      />

      {/* <Footer /> */}
    </Box>
  );
}
