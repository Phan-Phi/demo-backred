import React from "react";
import { GetServerSidePropsContext } from "next";

import { Contact } from "@/container";
import { ContactProps } from "@/container/Contact/Contact";

import { transformUrl } from "@/libs";
import prefetchData from "@/libs/prefetchData";
import { PAGES_API, TYPE_PARAMS } from "@/apis";

export default function ContactPage(props: ContactProps) {
  return <Contact {...props} />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const { locale } = context;

    const urls = [
      transformUrl(PAGES_API, {
        type: TYPE_PARAMS["contact.ContactPage"],
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
