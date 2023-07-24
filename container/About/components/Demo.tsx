import React from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

export default function Demo(props: any) {
  const { value } = props.data;

  const url = value.image.replace("http", "https");
  return (
    <Document file={url}>
      <Page pageNumber={1} />
    </Document>
  );
}
