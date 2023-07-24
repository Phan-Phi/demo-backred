import React from "react";
import { GetServerSidePropsContext } from "next";

import { ProductDetail } from "@/container";
import { ProductDetailProps } from "@/container/Product/ProductDetail";

import { transformUrl } from "@/libs";
import prefetchData from "@/libs/prefetchData";
import { PAGES_API, PRODUCTS_VARIANTS_API, TYPE_PARAMS } from "@/apis";

export default function ProductDetailPage(props: ProductDetailProps) {
  return <ProductDetail {...props} />;
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
      transformUrl(`${PAGES_API}${query.id}`, {
        fields: "*",
        locale,
      }),
      transformUrl(PRODUCTS_VARIANTS_API, {
        fields: "*",
        locale,
        product: query.id,
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
