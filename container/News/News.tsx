import { get, isEmpty } from "lodash";
import { Container, Grid, Tab } from "@mui/material";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";

import { ROUTES } from "@/routes";
import { Hero } from "@/compositions";
import { useRouter } from "next/router";
import { useFetch, useParams } from "@/hooks";
import TabItem from "@/components/Tabs/TabItem";
import { PAGES_API, TYPE_PARAMS } from "@/apis";
import CardNew from "@/compositions/Card/CardNew";
import { getSeoObject, transformUrl } from "@/libs";
import { IPage, responseSchema } from "@/interfaces";
import NewsLoadingButton from "@/components/Button/NewsLoadingButton";
import { Box, Link, LoadingProduct, SEO, Stack, TabPanel, Tabs } from "@/components";

const customTab = {
  id: -1,
  title: "Tất Cả",
};

export type NewsPageProps = IPage<
  [responseSchema<any>, responseSchema<any>, responseSchema<any>]
>;

export default function News(props: NewsPageProps) {
  const data = get(props, "initData[0].items");
  const dataDetail = get(props, "initData[1].items");
  const dataListing = get(props, "initData[2].items[0]");

  const { title, subtitle, meta } = dataListing;

  const [currentTab, setCurrentTab] = useState<number>(-1);

  const { locale, query } = useRouter();

  const { params, setParams } = useParams({
    initState: {
      type: TYPE_PARAMS["news.NewsPage"],
      limit: 5,
      fields: "*",
      locale,
    },
    excludeKeys: ["limit", "offset", "type"],
  });

  const {
    data: resData,
    changeKey,
    isDone,
    isLoading,
  } = useFetch(transformUrl(PAGES_API, params));

  useEffect(() => {
    changeKey(transformUrl(PAGES_API, params));
  }, [params]);

  const onChangeTabHandler = useCallback(
    (e: React.SyntheticEvent, value: number): void => {
      setCurrentTab(value);

      if (value === -1) {
        setParams({
          child_of: undefined,
          offset: undefined,
        });
      } else {
        setParams({
          child_of: value,
          offset: undefined,
        });
      }
    },
    []
  );

  const renderTabProduct = useMemo(() => {
    if (dataDetail === undefined) return;

    const mergeTabList = [customTab, ...dataDetail];

    return (
      <Tabs value={currentTab} onChange={onChangeTabHandler}>
        {mergeTabList.map((el: any, idx: number) => {
          return (
            <Tab
              label={<TabItem name={el.title} id={el.id} />}
              key={idx}
              value={el.id}
              disableRipple
            />
          );
        })}
      </Tabs>
    );
  }, [currentTab]);

  const renderCardItem = useMemo(() => {
    const LoadingComponent = <LoadingProduct />;

    let content: React.ReactNode = null;

    if (resData == undefined) {
      content = LoadingComponent;
    } else if (isEmpty(resData) && !isLoading) {
      content = (
        <Grid item xs={12}>
          {/* <Typography textAlign="center">{messages["noProduct"] as string}</Typography> */}
        </Grid>
      );
    } else {
      if (isLoading) {
        content = LoadingComponent;
      } else {
        content = (
          <Fragment>
            {resData.map((item: any) => {
              return (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <Link
                    href={`/${ROUTES.news}/${item.id}`}
                    style={{
                      display: "block",
                    }}
                  >
                    <CardNew data={item} />
                  </Link>
                </Grid>
              );
            })}
          </Fragment>
        );
      }
    }

    return (
      <TabPanel value={currentTab} index={currentTab}>
        <Grid container spacing={2}>
          {content}
        </Grid>
      </TabPanel>
    );
  }, [currentTab, resData, isLoading]);

  return (
    <Box>
      <SEO {...getSeoObject(meta)} />

      {/* <Hero
        ratio="1200/740"
        img="/image/home-banner.png"
        title={subtitle}
        subTitle={title}
      /> */}

      <Box sx={{ margin: "80px 0 40px 0" }}>{renderTabProduct}</Box>

      <Container>
        {renderCardItem}

        <Stack flexDirection="row" justifyContent="center" marginTop={5}>
          <NewsLoadingButton
            variant="contained"
            loading={isLoading}
            // onClick={onLoadingMoreHandler}
          >
            Xem Ngay
          </NewsLoadingButton>
        </Stack>
      </Container>
    </Box>
  );
}
