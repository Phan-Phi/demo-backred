import { transformUrl } from "@/libs";
import prefetchData from "@/libs/prefetchData";
import { PAGES_API, TYPE_PARAMS } from "@/apis";
import { GetServerSidePropsContext } from "next";
import About, { AboutPageProps } from "@/container/About/About";

export default function AboutPage(props: AboutPageProps) {
  return <About {...props} />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const { locale } = context;

    const urls = [
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
