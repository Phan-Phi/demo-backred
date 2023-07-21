import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import { get, isEmpty } from "lodash";
import { Box, Container, Grid, Stack, styled } from "@mui/material";

import Sort from "./components/Sort";
import { CardProductItem, Image, LoadingProduct, Pagination } from "@/components";

import {
  IPage,
  PRODUCTS,
  responseSchema,
  PRODUCT_CATEGORY_DETAIL,
  PRODUCT_CATEGORY_LISTING_TYPE,
} from "@/interfaces";

import { transformUrl } from "@/libs";
import { Hero } from "@/compositions";
import { PAGES_API, TYPE_PARAMS } from "@/apis";
import { useCart, useFetch, useMedia } from "@/hooks";

export type ProductListProps = IPage<
  [
    responseSchema<PRODUCT_CATEGORY_LISTING_TYPE>,
    responseSchema<PRODUCT_CATEGORY_DETAIL>,
    responseSchema<PRODUCTS>,
  ]
>;

export default function ProductList(props: ProductListProps) {
  const dataBanner = get(props, "initData[0].items");
  const dataBrand = get(props, "initData[1].items");
  const totalCount = get(props, "initData[2].meta.total_count");

  const router = useRouter();
  const { isExported } = useCart();
  const { isMdDown } = useMedia();

  const [filter, setFilter] = useState({
    limit: 8,
    offset: "0",
    fields: "*",
    is_exported: isExported,
    descendant_of: router.query.category,
    type: TYPE_PARAMS["product.ProductPage"],
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const { data, isLoading, changeKey } = useFetch<PRODUCTS>(
    transformUrl(PAGES_API, filter)
  );

  useEffect(() => {
    if (totalCount == undefined) return;

    if (isMdDown) {
      setTotalPage(Math.ceil(totalCount / 6));
    } else {
      setTotalPage(Math.ceil(totalCount / 8));
    }
  }, [totalCount, isMdDown]);

  useEffect(() => {
    changeKey(
      transformUrl(PAGES_API, {
        ...filter,
        is_exported: isExported,
        descendant_of: router.query.category,
      })
    );

    setCurrentPage(1);
  }, [isExported, router, filter]);

  const renderLogoBrand = useMemo(() => {
    if (dataBrand == undefined) return null;
    return dataBrand.map((item, index) => {
      return (
        <Box position="relative" key={index} width={176} height={96}>
          <Image src={item.banner} alt={item.title} />
        </Box>
      );
    });
  }, [dataBrand]);

  const renderProducts = useMemo(() => {
    const LoadingComponent = <LoadingProduct />;

    let content: React.ReactNode = null;

    if (data == undefined) {
      content = LoadingComponent;
    } else if (isEmpty(data) && !isLoading) {
      content = <Box>Không có sản phẩm</Box>;
    } else {
      if (isLoading) {
        content = LoadingComponent;
      } else {
        content = (
          <Grid container spacing="20px">
            {data.map((item, index) => {
              return (
                <Grid item xs={3} key={index}>
                  <CardProductItem
                    id={item.id}
                    title={item.title}
                    imgSrc={item.images[0].value}
                  />
                </Grid>
              );
            })}
          </Grid>
        );
      }
    }

    return content;
  }, [data]);

  const handlePagination = useCallback(
    (event: React.SyntheticEvent, page: number) => {
      setCurrentPage(page);
      if (currentPage === page) return;

      changeKey(
        transformUrl(PAGES_API, {
          ...filter,
          offset: (page - 1) * filter.limit,
        })
      );
    },
    [currentPage, filter]
  );

  if (dataBanner == undefined || dataBrand == undefined) return null;

  return (
    <StyledWrapper className="product-list">
      <Hero
        ratio="1200/740"
        img={dataBanner[0].banner}
        subTitle="Sản phẩm nổi bật"
        title="Món Ngon Tuyệt Hảo"
      />

      <StyledContainer>
        <StyledStack>
          <StyledCenter className="product-logo-brand">{renderLogoBrand}</StyledCenter>

          <StyledWrapperFilter>
            <Box />

            <Sort />
          </StyledWrapperFilter>

          {renderProducts}

          {totalCount && (
            <Pagination
              page={currentPage}
              count={totalPage}
              onchange={handlePagination}
            />
          )}
        </StyledStack>
      </StyledContainer>
    </StyledWrapper>
  );
}

const StyledWrapper = styled(Box)(() => {
  return {};
});

const StyledContainer = styled(Container)(() => {
  return {
    paddingTop: 80,
    paddingBottom: 80,
  };
});

const StyledStack = styled(Stack)(() => {
  return {
    gap: 40,
  };
});

const StyledWrapperFilter = styled(Stack)(() => {
  return {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  };
});

const StyledCenter = styled(Stack)(() => {
  return {
    gap: 20,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  };
});
