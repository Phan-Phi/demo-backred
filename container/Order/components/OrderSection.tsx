import React, { useEffect, useMemo } from "react";

import useSWR from "swr";
import { styled, Stack } from "@mui/material";

import OrderItem from "./OrderItem";

import { useCart } from "@/hooks";
import { CART_ITEM_API } from "@/apis";
import { CART_ITEM_TYPE, responseSchema } from "@/interfaces";

type OrderSectionProps = {
  setTotalPrice: (n: number) => void;
};

export default function OrderSection({ setTotalPrice }: OrderSectionProps) {
  const { fetcher } = useCart();

  const { data } = useSWR<responseSchema<CART_ITEM_TYPE>>(CART_ITEM_API, fetcher);

  useEffect(() => {
    if (data == undefined) return;

    const result = data.items.reduce((total, item) => {
      return total + parseFloat(item.variant_price) * item.quantity;
    }, 0);

    setTotalPrice(result);
  }, [data]);

  const renderOrderItem = useMemo(() => {
    if (data == undefined) return null;

    return data.items.map((item, index) => {
      return (
        <OrderItem
          key={index}
          id={item.id}
          variantId={item.variant}
          name={item.variant_name}
          price={item.variant_price}
          quantity={item.quantity}
        />
      );
    });
  }, [data]);

  return <StyledWrapper className="order-section">{renderOrderItem}</StyledWrapper>;
}

const StyledWrapper = styled(Stack)(() => {
  return {
    gap: 16,
    // height: 680,
    // overflowY: "auto",

    // ["&::-webkit-scrollbar"]: {
    //   display: "none",
    // },
    // scrollbarWidth: "none",
    // msOverflowStyle: "none",
  };
});
