import React, {
  useState,
  forwardRef,
  ChangeEvent,
  useCallback,
  useImperativeHandle,
} from "react";
import { useDebounce } from "react-use";
import { Input, InputProps, styled } from "@mui/material";

import SearchOutlined from "@/components/Icon/SearchOutlined";

interface SearchInputProps extends Omit<InputProps, "onChange"> {
  onChange?: (value: string) => void;
  initSearch?: string;
  debounceTime?: number | undefined;
}

export const SearchInput = forwardRef<
  {
    resetValue: () => void;
  },
  SearchInputProps
>(function SearchInput(props, ref) {
  const { initSearch, debounceTime = 500, onChange, ...restProps } = props;

  const [search, setSearch] = useState(initSearch || "");

  const onValueChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  useImperativeHandle(
    ref,
    () => {
      return {
        resetValue: () => {
          setSearch("");
        },
      };
    },
    []
  );

  useDebounce(
    () => {
      onChange && onChange(search);
    },
    debounceTime,
    [search, debounceTime]
  );

  return (
    <Input
      value={search}
      placeholder="Tìm sản phẩm..."
      fullWidth
      endAdornment={<StyledSearchOutlined />}
      onChange={onValueChange}
      {...restProps}
    />
  );
});

export default SearchInput;

const StyledSearchOutlined = styled(SearchOutlined)(({ theme }) => {
  return {
    // cursor: "pointer",
    color: theme.palette.common.white,
  };
});
