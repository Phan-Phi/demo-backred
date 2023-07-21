import React from "react";
import { GetServerSidePropsContext } from "next";

import { ProductDetail } from "@/container";
import { ProductDetailProps } from "@/container/Product/ProductDetail";

import { PAGES_API } from "@/apis";
import { transformUrl } from "@/libs";
import prefetchData from "@/libs/prefetchData";

export default function ProductDetailPage(props: ProductDetailProps) {
  return <ProductDetail {...props} />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const { locale, query } = context;

    const urls = [
      transformUrl(`${PAGES_API}/${query.category}`, {
        fields: "*",
        locale,
      }),
    ];

    const { fallback, resList } = await prefetchData(urls, { locale });

    return {
      props: {
        initData: resList,
        fallback,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
}
