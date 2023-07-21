import SVG from "../SVG";
import { Box, styled } from "@mui/material";

export default function ArrowDownIcon() {
  return (
    <StyledWrapper>
      <SVG src="/svg/arrow-down.svg" />
    </StyledWrapper>
  );
}

const StyledWrapper = styled(Box)(() => {
  return {
    width: "fit-content",
    height: "fit-content",
  };
});
