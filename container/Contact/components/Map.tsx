import React from "react";
import { useMeasure } from "react-use";

import { get } from "lodash";
import { Box } from "@mui/material";

import { useSetting } from "@/hooks";
import { MAP_RATIO } from "@/constants";

const defaultUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d244.96263779369298!2d106.6613525279867!3d10.780475480047404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752fe09e28f4fd%3A0x325f6b1110b41ec1!2zQ8O0bmcgdHkgxJBFTiDEkE_MiQ!5e0!3m2!1svi!2s!4v1689758960515!5m2!1svi!2s";

export default function Map() {
  const setting = useSetting();
  const [ref, { width }] = useMeasure();

  const mapSrc = get(setting, "address_google_map_iframe_link");

  return (
    <Box ref={ref}>
      <iframe
        src={mapSrc || defaultUrl}
        width={width}
        height={width / MAP_RATIO}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </Box>
  );
}
