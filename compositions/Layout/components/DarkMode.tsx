import { Box, LightIcon, DarkIcon } from "@/components";
import useThemeMode from "@/hooks/useThemeMode";
import { styled } from "@mui/material";
import { useState } from "react";

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

const Wrapper = styled(Box)(({ theme }) => {
  return {
    cursor: "pointer",
  };
});
