import classNames from "classnames";
import React, { useCallback } from "react";
import NumberFormat, { NumberFormatProps, NumberFormatValues } from "react-number-format";

import { styled } from "@mui/material";

import SVG from "../SVG";
import Box from "../Box/Box";

type OmitKey = "onValueChange" | "customInput";

interface CounterInputProps extends Omit<NumberFormatProps, OmitKey> {
  onValueChange?: (value: number) => void;
}

const CounterInput = (props: CounterInputProps) => {
  const { value, onValueChange, ...restProps } = props;

  const onValueChangeHandler = useCallback(
    (e: NumberFormatValues) => {
      const { floatValue } = e;
      onValueChange && onValueChange(floatValue || 1);
    },
    [onValueChange]
  );

  const onIncreaseNumberHandler = useCallback(() => {
    const parsedValue = Number(value);

    if (Number.isNaN(parsedValue)) return;

    onValueChange && onValueChange(parsedValue + 1);
  }, [onValueChange, value]);

  const onDecreaseNumberHandler = useCallback(() => {
    const parsedValue = Number(value);

    if (Number.isNaN(parsedValue)) return;

    if (parsedValue <= 1) return;

    onValueChange && onValueChange(parsedValue - 1);
  }, [value, onValueChange]);

  const isAllowedHandler = useCallback((values: NumberFormatValues): boolean => {
    const { floatValue, value } = values;
    if (value.match(/[\.,]/g)) return false;
    if (floatValue == undefined) return true;
    if (floatValue === 0) return false;

    return true;
  }, []);

  return (
    <StyledBox className="counter-input">
      <StyledWrapperSVG
        className={classNames([
          "counter-input__decrease",
          {
            disabled: value == undefined || Number(value) <= 1,
          },
        ])}
        onClick={onDecreaseNumberHandler}
      >
        <StyledMinus src="/svg/minus.svg" />
      </StyledWrapperSVG>

      <StyledNumberFormat
        value={value}
        allowNegative={false}
        thousandSeparator
        isAllowed={isAllowedHandler}
        onValueChange={onValueChangeHandler}
        allowLeadingZeros={false}
        {...restProps}
      />

      <StyledWrapperSVG
        className="counter-input__increase"
        onClick={onIncreaseNumberHandler}
      >
        <SVG src="/svg/plus.svg" />
      </StyledWrapperSVG>
    </StyledBox>
  );
};

const StyledBox = styled(Box)(({ theme }) => {
  return {
    borderRadius: 3,
    borderWidth: 0.3,
    borderStyle: "solid",
    borderColor: "#fff",

    width: "auto",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  };
});

const StyledWrapperSVG = styled(Box)(() => {
  return {
    height: 32,
    padding: 10,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    ["&:hover"]: {
      opacity: 0.7,
    },

    "&.counter-input__decrease.disabled": {
      pointerEvents: "none",
      opacity: 0.7,
    },
  };
});

const StyledMinus = styled(SVG)(() => {
  return {
    marginTop: -8,
  };
});

const StyledNumberFormat = styled(NumberFormat)(() => {
  return {
    padding: 10,
    width: 90,
    textAlign: "center",

    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0.3,
    borderRightWidth: 0.3,

    borderStyle: "solid",
    borderColor: "#fff",

    color: "#fff",
    outline: "none",
    backgroundColor: "transparent",

    ["& input"]: {
      padding: 0,
      color: "#fff",
      textAlign: "center",
    },
  };
});

export default CounterInput;
