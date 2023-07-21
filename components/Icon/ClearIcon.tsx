import SVG from "../SVG";
import { Box, styled } from "@mui/material";

export default function ClearIcon() {
  return (
    <StyledWrapper>
      <SVG src="/svg/clear.svg" />
    </StyledWrapper>
  );
}

const StyledWrapper = styled(Box)(() => {
  return {
    width: 20,
    height: 20,
  };
});
