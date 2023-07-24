import { useMemo } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Grid, Typography, styled } from "@mui/material";

import { Link } from "@/components";
import { BlockTypeDocument } from "@/interfaces";
import dynamic from "next/dynamic";

const Demo = dynamic(import("./Demo"), {
  ssr: false,
});

interface Props {
  isExported: boolean;
  local_certificates: BlockTypeDocument[];
  export_certificates: BlockTypeDocument[];
}

export default function AboutCertificates({
  local_certificates,
  export_certificates,
  isExported,
}: Props) {
  const renderPDF = useMemo(() => {
    const data = isExported ? export_certificates : local_certificates;
    return data.map((el, idx) => {
      const url = el.value.image.replace("http", "https");

      return (
        <Grid item key={idx} xs={4}>
          <WrapperPDF href={el.value.image} target="_blank">
            <Demo data={el} />
            <TitlePDF variant="p_large">{el.value.title}</TitlePDF>
          </WrapperPDF>
        </Grid>
      );
    });
  }, [local_certificates, export_certificates, isExported]);

  return (
    <Grid container spacing={10}>
      {renderPDF}
    </Grid>
  );
}

const TitlePDF = styled(Typography)(({ theme }) => {
  return {
    marginTop: "20px",
    fontWeight: 800,
  };
});

const WrapperPDF = styled(Link)(({ theme }) => {
  return {
    textAlign: "center",
    marginTop: "20px",

    "& canvas": {
      width: "100% !important",
      height: "auto !important",
    },
    "& .react-pdf__Page__textContent , .react-pdf__Page__annotations": {
      display: "none !important",
    },
  };
});
