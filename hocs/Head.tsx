import NextHead from "next/head";
import { useTheme } from "@mui/material";

const Head = () => {
  const theme = useTheme();

  return (
    <NextHead>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <meta name="theme-color" content={theme.palette.background.default} />
    </NextHead>
  );
};

export default Head;
