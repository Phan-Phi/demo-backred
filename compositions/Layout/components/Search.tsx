import React, {
  useState,
  forwardRef,
  ChangeEvent,
  useCallback,
  useImperativeHandle,
  useRef,
} from "react";

import { useDebounce } from "react-use";
import { useTypewriter } from "react-simple-typewriter";
import { Input, InputProps, styled } from "@mui/material";

import { useSetting } from "@/hooks";
import SearchOutlined from "@/components/Icon/SearchOutlined";

interface SearchInputProps extends Omit<InputProps, "onChange"> {
  onChange?: (value: string) => void;
  initSearch?: string;
  debounceTime?: number | undefined;
  isTypewriterEffect?: boolean;
}

export const SearchInput = forwardRef<
  {
    resetValue: () => void;
  },
  SearchInputProps
>(function SearchInput(props, ref) {
  const {
    initSearch,
    debounceTime = 500,
    onChange,
    isTypewriterEffect,
    ...restProps
  } = props;

  const inputRef = useRef<HTMLInputElement>();

  const setting = useSetting();

  const [search, setSearch] = useState(initSearch || "");

  const [text] = useTypewriter({
    words: setting?.search_bar_placeholders?.map((el) => el.value),
    loop: true,
    typeSpeed: 100,
  });

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
    <StyledInput
      className="search-input"
      value={search}
      fullWidth
      placeholder={!isTypewriterEffect ? "Tìm kiếm sản phẩm..." : text}
      endAdornment={<StyledSearchOutlined />}
      onChange={onValueChange}
      inputRef={inputRef}
      {...restProps}
    />
  );
});

export default SearchInput;

const StyledInput = styled(Input)(() => {
  return {};
});

const StyledSearchOutlined = styled(SearchOutlined)(({ theme }) => {
  return {
    color: theme.palette.common.white,
  };
});
