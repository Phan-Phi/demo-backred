import { PAGES_API, TYPE_PARAMS } from "@/apis";
import { Home } from "@/container";
import { HomePageProps } from "@/container/Home/Home";
import { transformUrl } from "@/libs";
import prefetchData from "@/libs/prefetchData";
import { GetServerSidePropsContext } from "next";

export default function HomePage(props: HomePageProps) {
  return <Home {...props} />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const { locale } = context;

    const urls = [
      transformUrl(PAGES_API, {
        type: TYPE_PARAMS["home.HomePage"],
        fields: "*",
        locale,
      }),

      transformUrl(PAGES_API, {
        type: TYPE_PARAMS["news.NewsCategoryListingPage"],
        fields: "*",
        locale,
      }),

      transformUrl(PAGES_API, {
        type: TYPE_PARAMS["news.NewsCategoryDetailPage"],
        fields: "*",
        locale,
      }),

      transformUrl(PAGES_API, {
        type: TYPE_PARAMS["news.NewsPage"],
        fields: "*",
        locale,
      }),

      transformUrl(PAGES_API, {
        type: TYPE_PARAMS["product.ProductCategoryDetailPage"],
        fields: "*",
        locale,
      }),

      transformUrl(PAGES_API, {
        type: TYPE_PARAMS["product.ProductPage"],
        fields: "*",
        locale,
      }),

      transformUrl(PAGES_API, {
        type: TYPE_PARAMS["product.ProductCategoryListingPage"],
        fields: "*",
        locale,
      }),

      transformUrl(PAGES_API, {
        type: TYPE_PARAMS["about.AboutPage"],
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
