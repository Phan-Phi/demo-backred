import { Box, Tabs } from "@/components";
import { Hero } from "@/compositions";
import Footer from "@/compositions/Layout/Footer";
import { useCallback, useMemo, useState } from "react";

const customTab = {
  id: -1,
  title: "all",
};

const customTab2 = [
  {
    id: 0,
    title: "all",
  },
  {
    id: 1,
    title: "all",
  },
];

export default function News() {
  const [currentTab, setCurrentTab] = useState<number>(-1);

  const onChangeTabHandler = useCallback(
    (e: React.SyntheticEvent, value: number): void => {
      setCurrentTab(value);
    },
    []
  );

  //   const renderTabProduct = useMemo(() => {
  //     // if (tabList == undefined) {
  //     //   return null;
  //     // }

  //     const mergeTabList = [customTab, ...customTab2];

  //     return <Tabs data={mergeTabList} value={currentTab} onChange={onChangeTabHandler} />;
  //   }, [currentTab]);

  return (
    <Box>
      <Hero
        ratio="1200/740"
        img="/image/home-banner.png"
        title="Góc thông tin"
        subTitle="TIN TỨC MỚI NHẤT"
      />
      {/* {renderTabProduct} */}
    </Box>
  );
}
