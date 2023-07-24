import { PAGES_API, TYPE_PARAMS } from "@/apis";
import News, { NewsPageProps } from "@/container/News/News";
import { transformUrl } from "@/libs";
import prefetchData from "@/libs/prefetchData";
import { GetServerSidePropsContext } from "next";

export default function NewsPage(props: NewsPageProps) {
  return <News {...props} />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const { locale } = context;

    const urls = [
      transformUrl(PAGES_API, {
        type: TYPE_PARAMS["news.NewsPage"],
        fields: "*",
        locale,
      }),
      transformUrl(PAGES_API, {
        type: TYPE_PARAMS["news.NewsCategoryDetailPage"],
        fields: "*",
        locale,
      }),
      transformUrl(PAGES_API, {
        type: TYPE_PARAMS["news.NewsCategoryListingPage"],
        fields: "*",
        locale,
      }),
    ];

    const { resList, fallback } = await prefetchData(urls, {
      locale,
    });

    return {
      props: {
        initData: resList,
        fallback,
      },
    };
  } catch (err) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
}
