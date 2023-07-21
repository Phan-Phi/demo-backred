import { useEffect, useRef, useState } from "react";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import { Box, Button, Container, Stack, Typography, useTheme } from "@mui/material";

import { CounterInput } from "@/components";
import useThemeMode from "@/hooks/useThemeMode";
import Search from "@/compositions/Layout/components/Search";

// import axios from "@/axios.config";
import axios from "axios";

const DungTest = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { setMode } = useThemeMode();

  const [count, setCount] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        const { headers, request } = await axios.get(
          "https://demo-blackred-api.services.t-solution.vn/api/v2/cart/",
          {
            transformRequest: (data) => {
              console.log("🚀 ~ file: dungtest.tsx:24 ~ data:", data);
            },
            headers: {
              // "Access-Control-Expose-Headers": "server",
            },
            // transformResponse: (data) => {
            //   console.log("🚀 ~ file: dungtest.tsx:27 ~ data:", data);
            //   return data;
            // },
          }
        );
        console.log(headers, request);
      } catch {}
    })();
  }, []);

  return (
    <Container>
      <Box
        sx={{
          alignItems: "center",
          minHeight: "100vh",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Button
          onClick={() => {
            setMode("light");
          }}
        >
          LIGHT
        </Button>
        <Button
          onClick={() => {
            setMode("dark");
          }}
        >
          DARK
        </Button>

        <Stack width={500} spacing={3}>
          <Search
            onChange={(value) => {
              console.log(value);
            }}
            isTypewriterEffect
          />

          <CounterInput
            onValueChange={(value) => {
              setCount(value);
            }}
            value={count}
          />
        </Stack>
      </Box>
    </Container>
  );
};

export default DungTest;

export const getStaticProps: GetStaticProps<{
  repo: any;
}> = async (...props) => {
  return { props: { repo: {} }, revalidate: 60 };
};
