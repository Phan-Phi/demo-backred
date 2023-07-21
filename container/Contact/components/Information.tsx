import React from "react";
import { Grid } from "@mui/material";

import Map from "./Map";
import ContactInfo from "./ContactInfo";

export default function Information() {
  return (
    <Grid container spacing="40px">
      <Grid item xs={4}>
        <ContactInfo />
      </Grid>

      <Grid item xs={8}>
        <Map />
      </Grid>
    </Grid>
  );
}
