// import { PAGES_API, TYPE_PARAMS } from "@/apis";
// import { Box, Link, Stack, TabPanel } from "@/components";
// import NewsLoadingButton from "@/components/Button/NewsLoadingButton";
// import CardNew from "@/compositions/Card/CardNew";
// import { useFetch, useParams } from "@/hooks";
// import { transformUrl } from "@/libs";
// import { ROUTES } from "@/routes";
// import { Grid, Typography } from "@mui/material";
// import { isEmpty } from "lodash";
// import { useRouter } from "next/router";
// import { Fragment, useMemo } from "react";
// import { useUpdateEffect } from "react-use";

// interface Props {
//   data: any;
//   currentTab: number;
// }

// export default function NewsContent({ data, currentTab }: Props) {
//   const { locale, query } = useRouter();

//   const { params, setParams } = useParams({
//     initState: {
//       type: TYPE_PARAMS["news.NewsPage"],
//       limit: 2,
//       fields: "*",
//       locale,
//     },
//     // excludeKeys: ["limit", "offset", "type"],
//   });

//   const {
//     data: resData,
//     changeKey,
//     isDone,
//     isLoading,
//   } = useFetch(transformUrl(PAGES_API, params));
//   console.log("🚀 ~ file: NewsContent.tsx:35 ~ NewsContent ~ isDone:", isDone);

//   useUpdateEffect(() => {
//     const childOf = query.child_of;

//     if (childOf && typeof childOf === "string" && !isNaN(childOf)) {
//       //   setCurrentTab(parseInt(childOf));

//       setParams({
//         child_of: childOf,
//         offset: undefined,
//         search: undefined,
//       });
//     }
//   }, [query.child_of]);

//   const renderCardItem = useMemo(() => {
//     const LoadingComponent = (
//       <Fragment>
//         <Grid item xs={12} sm={6} md={3}>
//           {/* <CardPlaceholder /> */}
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           {/* <CardPlaceholder /> */}
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           {/* <CardPlaceholder /> */}
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           {/* <CardPlaceholder /> */}
//         </Grid>
//       </Fragment>
//     );

//     let content: React.ReactNode = null;

//     if (resData == undefined) {
//       content = LoadingComponent;
//     } else if (isEmpty(resData) && !isLoading) {
//       content = (
//         <Grid item xs={12}>
//           {/* <Typography textAlign="center">{messages["noProduct"] as string}</Typography> */}
//         </Grid>
//       );
//     } else {
//       if (isLoading) {
//         content = LoadingComponent;
//       } else {
//         content = (
//           <Fragment>
//             {resData.map((item: any) => {
//               return (
//                 <Grid item xs={12} sm={6} md={4} key={item.id}>
//                   <Link
//                     href={`/${ROUTES.news}/${item.id}`}
//                     style={{
//                       display: "block",
//                     }}
//                   >
//                     <CardNew data={item} />
//                   </Link>
//                 </Grid>
//               );
//             })}
//           </Fragment>
//         );
//       }
//     }

//     return (
//       <TabPanel value={currentTab} index={currentTab}>
//         <Grid container spacing={2}>
//           {content}
//         </Grid>
//       </TabPanel>
//     );
//   }, [currentTab, data, isLoading]);

//   return (
//     <Box>
//       {renderCardItem}

//       <Stack flexDirection="row" justifyContent="center">
//         {!isDone && (
//           <NewsLoadingButton
//             variant="contained"
//             loading={isLoading}
//             // onClick={onLoadingMoreHandler}
//           >
//             áđâsđá
//           </NewsLoadingButton>
//         )}

//         <NewsLoadingButton
//           variant="contained"
//           loading={isLoading}
//           // onClick={onLoadingMoreHandler}
//         >
//           áđâsđá
//         </NewsLoadingButton>
//       </Stack>
//     </Box>
//   );
// }
export {};
