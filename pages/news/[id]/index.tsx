import { PAGES_API, TYPE_PARAMS } from "@/apis";
import NewsDetail, { NewsPageProps } from "@/container/News/NewsDetail";
import { transformUrl } from "@/libs";
import prefetchData from "@/libs/prefetchData";
import { GetServerSidePropsContext } from "next";

export default function NewsDetailPage(props: NewsPageProps) {
  return <NewsDetail {...props} />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const { locale, query } = context;

    const urls = [
      transformUrl(PAGES_API, {
        type: TYPE_PARAMS["news.NewsCategoryListingPage"],
        fields: "*",
        locale,
      }),

      transformUrl(`${PAGES_API}${query.id}`, {
        fields: "*",
        locale,
      }),

      transformUrl(PAGES_API, {
        type: TYPE_PARAMS["news.NewsPage"],
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
