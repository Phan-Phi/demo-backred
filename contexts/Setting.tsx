import useSWR from "swr";
import { createContext, useMemo } from "react";

import { SETTING_API } from "@/apis";
import { SETTING_ITEM } from "@/interfaces";

type SettingProps = {
  children: React.ReactNode;
};

export const SettingContext = createContext<SETTING_ITEM>({} as SETTING_ITEM);

const Setting = ({ children }: SettingProps) => {
  const { data } = useSWR<SETTING_ITEM>(SETTING_API, {
    refreshInterval: 600 * 1000,
  });

  const memoData = useMemo(() => {
    if (data == undefined) return {} as SETTING_ITEM;

    return data;
  }, [data]);

  return <SettingContext.Provider value={memoData}>{children}</SettingContext.Provider>;
};

export default Setting;
