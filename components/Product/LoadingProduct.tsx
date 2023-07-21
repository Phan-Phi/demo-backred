import React, { useMemo } from "react";

import { Grid } from "@mui/material";

import { useMedia } from "@/hooks";
import CardProductPlaceholder from "./CardProductPlaceholder";

export default function LoadingProduct() {
  const { isSmDown, isMdDown } = useMedia();

  const renderItem = useMemo(() => {
    if (isSmDown) {
      return Array(1)
        .fill(0)
        .map((item, index) => {
          return (
            <Grid key={index} item xs={12}>
              <CardProductPlaceholder />
            </Grid>
          );
        });
    }

    if (isMdDown) {
      return Array(3)
        .fill(0)
        .map((item, index) => {
          return (
            <Grid key={index} item xs={4}>
              <CardProductPlaceholder />
            </Grid>
          );
        });
    }

    return Array(4)
      .fill(0)
      .map((item, index) => {
        return (
          <Grid key={index} item xs={3}>
            <CardProductPlaceholder />
          </Grid>
        );
      });
  }, [isSmDown, isMdDown]);

  return (
    <Grid container className="product-loading" spacing="1rem">
      {renderItem}
    </Grid>
  );
}
