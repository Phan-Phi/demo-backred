import { useEffect, useRef, useState } from "react";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import { Box, Button, Container, Stack, Typography, useTheme } from "@mui/material";

import { CounterInput } from "@/components";
import useThemeMode from "@/hooks/useThemeMode";
import Search from "@/compositions/Layout/components/Search";

const DungTest = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const theme = useTheme();
  const { setMode } = useThemeMode();

  const [count, setCount] = useState(1);

  return (
    <Container>
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

      <Typography sx={{ color: theme.palette.text.primary }}>
        asdasdasdasdasdasdadadasda
      </Typography>

      <Stack spacing={3}>
        <Search
          onChange={(value) => {
            console.log(value);
          }}
        />

        <CounterInput
          onValueChange={(value) => {
            setCount(value);
          }}
          value={count}
        />
      </Stack>
    </Container>
  );
};

export default DungTest;

export const getStaticProps: GetStaticProps<{
  repo: any;
}> = async (...props) => {
  return { props: { repo: {} }, revalidate: 60 };
};
