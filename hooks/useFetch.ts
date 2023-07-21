import { useEffect } from "react";
import { SWRConfiguration } from "swr";
import queryString from "query-string";

import { transformUrl } from "@/libs";
import useFetchBase from "./useFetchBase";
import { ResponseErrorType, ResponseType } from "@/interfaces/UseFetch";

const useFetch = <
  T = any,
  V extends ResponseType<T> = ResponseType<T>,
  Error = ResponseErrorType
>(
  key?: string,
  options?: SWRConfiguration
) => {
  const {
    resData,
    data,
    setData,
    isValidating,
    setIsLoading,
    setIsDone,
    changeKey,
    isDone,
    isLoading,
    error,
    refreshData,
    fetchRef,
    fetchNextPage,
    fetchPreviousPage,
  } = useFetchBase<T, V, Error>(key, options);

  useEffect(() => {
    if (key == undefined) return;
    if (resData == undefined && isValidating) setIsLoading(true);
    if (isValidating) return;
    if (resData == undefined) return;

    const { items, page, totalPages } = resData;

    setData(items);

    const { query, url } = queryString.parseUrl(key);

    const nextPage = page + 1;
    const prevPage = page - 1;

    if (nextPage > totalPages) {
      fetchRef.current.nextPage = null;
    } else {
      const nextUrl = transformUrl(url, {
        ...query,
        page: nextPage,
      });

      fetchRef.current.nextPage = nextUrl;
    }

    if (prevPage < 1) {
      fetchRef.current.previousPage = null;
    } else {
      const prevUrl = transformUrl(url, {
        ...query,
        page: prevPage,
      });
      fetchRef.current.previousPage = prevUrl;
    }

    if (page === totalPages) {
      setIsDone(true);
    } else {
      setIsDone(false);
    }

    setIsLoading(false);
  }, [resData, isValidating, key]);

  return {
    data,
    resData,
    error,
    isDone,
    isLoading,
    isValidating,
    changeKey,
    refreshData,
    fetchNextPage,
    fetchPreviousPage,
  };
};
export default useFetch;
