import React from "react";
import { GetServerSidePropsContext } from "next";

import { ProductList } from "@/container";
import { ProductListProps } from "@/container/Product/ProductList";

import { transformUrl } from "@/libs";
import prefetchData from "@/libs/prefetchData";
import { PAGES_API, TYPE_PARAMS } from "@/apis";

export default function ProductListPage(props: ProductListProps) {
  return <ProductList {...props} />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const { locale, query } = context;

    const urls = [
      transformUrl(PAGES_API, {
        type: TYPE_PARAMS["product.ProductCategoryListingPage"],
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
        descendant_of: query.category,
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
