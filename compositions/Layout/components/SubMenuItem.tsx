import { useRouter } from "next/router";
import { Typography, styled } from "@mui/material";

import { useMemo } from "react";
import { useFetch } from "@/hooks";
import { transformUrl } from "@/libs";
import { Box, Stack } from "@/components";
import { PAGES_API, TYPE_PARAMS } from "@/apis";

export default function SubMenuItem() {
  const { locale, push } = useRouter();

  const { data } = useFetch(
    transformUrl(PAGES_API, {
      type: TYPE_PARAMS["product.ProductCategoryDetailPage"],
      fields: "*",
      locale,
    })
  );

  const render = useMemo(() => {
    if (data === undefined) return;

    return data.map((el, idx) => {
      return (
        <TextItemMenu
          key={idx}
          variant="p_large"
          onClick={() => {
            push(`/product?category=${el.id}`);
          }}
        >
          {el.title}
        </TextItemMenu>
      );
    });
  }, [data]);

  return (
    <SubMenu className="submenu">
      <WrapperExpandSubMenu>{render}</WrapperExpandSubMenu>
    </SubMenu>
  );
}

const WrapperExpandSubMenu = styled(Stack)(({ theme }) => {
  return {
    width: "auto",
    padding: "0.8rem 0",
    position: "relative",
    cursor: "pointer",
  };
});

const SubMenu = styled(Box)(({ theme }) => {
  return {
    width: "max-content",
    position: "absolute",
    top: "100%",
    transition: "all 0.5s  ease",
    transform: "rotate3d(1,0,0,-90deg)",
    transformOrigin: "0 0 0",
    background: "rgba(38, 38, 38, 0.8)",
    backdropFilter: "blur(5px)",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  };
});

const TextItemMenu = styled(Typography)(({ theme }) => {
  return {
    display: "block",
    textTransform: "uppercase",
    transition: "all 0.4s",
    marginTop: "1px",
    lineHeight: "24px",
    "&:hover": {
      color: theme.palette.primary.main,
    },
  };
});
