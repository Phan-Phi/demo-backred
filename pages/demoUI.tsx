import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { CardProductItem, CounterInput, LoadingProduct, VNDCurrency } from "@/components";
import { useCart } from "@/hooks";
import dynamic from "next/dynamic";
import { District, Province, Ward } from "@/compositions";
import { Controller, useForm } from "react-hook-form";

const DynamicCartItem = dynamic(() => import("@/components/CartItem/CartItem"), {
  ssr: false,
});

const dataProduct = [
  {
    id: 1,
    name: "Bánh quy kem",
    price: 2000,
    variant: ["Kem", "Dâu", "Truyền Thống"],
    quantity: 1,
  },
  {
    id: 2,
    name: "Bánh  Dâu 1",
    price: 3000,
    variant: ["Kem", "Dâu", "Truyền Thống"],
    quantity: 2,
  },
  {
    id: 3,
    name: "Bánh  Dâu 2",
    price: 4000,
    variant: ["Kem", "Dâu", "Truyền Thống"],
    quantity: 3,
  },
];

export default function DemoUI() {
  const { control, setValue, watch } = useForm();

  const { addProductItem, cart, deleteProductItem, totalPrice } = useCart();

  const handleAddProduct = useCallback((item: any) => {
    const { id, name, price, quantity } = item;

    let obj = {
      id,
      name,
      price,
      quantity,
    };

    addProductItem(obj);
  }, []);

  const renderCartItem = useMemo(() => {
    if (cart == undefined) return null;

    return cart.map((item: any, index: number) => {
      return (
        <DynamicCartItem
          key={index}
          id={item.id}
          name={item.name}
          price={item.price}
          quantityOfProduct={item.quantity}
          onDeleteItem={() => deleteProductItem(item.id)}
        />
      );
    });
  }, [cart]);

  return (
    <Box sx={{ bgcolor: "#262626", padding: "40px" }}>
      <Controller
        name="province"
        control={control}
        render={(props) => {
          return (
            <Province
              controlState={props}
              onChange={() => {
                setValue("district", null);
                setValue("ward", null);
              }}
            />
          );
        }}
      />

      <Controller
        name="district"
        control={control}
        render={(props) => {
          const provinceTuple = watch("province");

          return (
            <District
              controlState={props}
              province={provinceTuple ? provinceTuple?.code : undefined}
              onChange={() => {
                setValue("ward", null);
              }}
            />
          );
        }}
      />

      <Controller
        name="ward"
        control={control}
        render={(props) => {
          const districtTuple = watch("district");

          return (
            <Ward
              controlState={props}
              district={districtTuple ? districtTuple["code"] : undefined}
            />
          );
        }}
      />

      {/* <Box sx={{ width: "100%" }}> {renderCartItem}</Box>

      {dataProduct.map((item, index) => {
        return (
          <Box key={index} sx={{ border: "1px solid red" }}>
            <Typography sx={{ color: "#fff" }}>{(item.name, item.id)}</Typography>
            <Button
              onClick={() => {
                handleAddProduct(item);
              }}
            >
              Add
            </Button>
          </Box>
        );
      })} */}
    </Box>
  );
}
