import { Stack, Typography, TypographyProps, styled } from "@mui/material";

import Line from "./Line";
import SubTitle from "./SubTitle";
import Title from "./Title";

type HeadlineProps = {
  subTitle?: React.ReactNode;
  title?: React.ReactNode;
  line?: boolean;
};

export default function Headline({ subTitle, title, line = true }: HeadlineProps) {
  return (
    <Stack className="headline" gap="20px">
      <StyledStack>
        {line && <Line />}
        {subTitle && <SubTitle>{subTitle}</SubTitle>}
      </StyledStack>

      {title && <Title>{title}</Title>}
    </Stack>
  );
}
const StyledStack = styled(Stack)(() => {
  return {
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
  };
});
