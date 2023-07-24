import { useState } from "react";

import { styled } from "@mui/material";
import useThemeMode from "@/hooks/useThemeMode";
import { Box, LightIcon, DarkIcon, Stack } from "@/components";

export default function DarkMode() {
  const { setMode } = useThemeMode();
  const [state, setState] = useState<boolean>(true);

  return (
    <Wrapper
      onClick={() => {
        setState(!state);
        setMode(state ? "light" : "dark");
      }}
    >
      {state ? <LightIcon /> : <DarkIcon />}
    </Wrapper>
  );
}

const Wrapper = styled(Stack)(({ theme }) => {
  return {
    cursor: "pointer",
  };
});
