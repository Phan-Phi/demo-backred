import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import { get, isEmpty } from "lodash";
import { Box, Container, Grid, Stack, Tab, styled } from "@mui/material";

import Sort from "./components/Sort";
import { CardProductItem, LoadingProduct, Pagination, Tabs } from "@/components";

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
  [responseSchema<PRODUCT_CATEGORY_LISTING_TYPE>, responseSchema<PRODUCT_CATEGORY_DETAIL>]
>;

const tabAll = { id: 0, title: "Tất Cả" };

export default function ProductList(props: ProductListProps) {
  const dataBanner = get(props, "initData[0].items");
  const dataBrand = get(props, "initData[1].items");
  const tabsData = [tabAll, ...dataBrand];

  const router = useRouter();
  const { isExported } = useCart();
  const { isMdDown } = useMedia();

  const [category, setCategory] = useState(0);

  const [filter, setFilter] = useState({
    limit: 8,
    offset: "0",
    fields: "*",
    is_exported: isExported,
    locale: router.locale,
    type: TYPE_PARAMS["product.ProductPage"],
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const { data, isLoading, changeKey, resData } = useFetch<PRODUCTS>(
    transformUrl(PAGES_API, filter)
  );

  useEffect(() => {
    if (resData == undefined) return;

    const totalCount = resData.meta.total_count;

    if (isMdDown) {
      setTotalPage(Math.ceil(totalCount / 6));
    } else {
      setTotalPage(Math.ceil(totalCount / 8));
    }
  }, [resData, isMdDown]);

  useEffect(() => {
    const categoryId = Number(router.query.category);

    if (router.query.category) {
      changeKey(
        transformUrl(PAGES_API, {
          ...filter,
          is_exported: isExported,
          descendant_of: categoryId,
        })
      );
      setCategory(categoryId);
    } else {
      changeKey(
        transformUrl(PAGES_API, {
          ...filter,
          is_exported: isExported,
        })
      );
      setCategory(0);
    }

    setCurrentPage(1);
  }, [isExported]);

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

  const handleChangeCategory = useCallback(
    (event: React.SyntheticEvent, value: number) => {
      if (value === 0) {
        changeKey(
          transformUrl(PAGES_API, {
            ...filter,
            is_exported: isExported,
            locale: router.locale,
          })
        );
      } else {
        changeKey(
          transformUrl(PAGES_API, {
            ...filter,
            is_exported: isExported,
            descendant_of: value,
            locale: router.locale,
          })
        );
      }
      setCategory(value);
      setCurrentPage(1);
      // router.replace("/product", undefined, { shallow: true });
    },
    [isExported, router]
  );

  const handlePagination = useCallback(
    (event: React.SyntheticEvent, page: number) => {
      setCurrentPage(page);
      if (currentPage === page) return;

      if (category === 0) {
        changeKey(
          transformUrl(PAGES_API, {
            ...filter,
            offset: (page - 1) * filter.limit,
            locale: router.locale,
          })
        );
      } else {
        changeKey(
          transformUrl(PAGES_API, {
            ...filter,
            offset: (page - 1) * filter.limit,
            descendant_of: category,
            locale: router.locale,
          })
        );
      }
    },
    [currentPage, filter, category, router]
  );

  if (dataBanner == undefined || dataBrand == undefined) return null;

  return (
    <StyledWrapper className="product-list">
      {/* <Hero
        ratio="1200/740"
        img={dataBanner[0].banner}
        subTitle={dataBanner[0].title}
        title={dataBanner[0].subtitle}
      /> */}

      <StyledContainer>
        <StyledStack>
          <StyledCenter className="product-list-tabs">
            <Tabs value={category} onChange={handleChangeCategory}>
              {tabsData.map((item) => {
                return <Tab key={item.id} label={item.title} value={item.id} />;
              })}
            </Tabs>
          </StyledCenter>

          <StyledWrapperFilter>
            <Box />

            <Sort />
          </StyledWrapperFilter>

          {renderProducts}

          <Pagination page={currentPage} count={totalPage} onchange={handlePagination} />
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
