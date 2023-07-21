import { BoxProps, Container, Typography, styled } from "@mui/material";

import { Box, Ratio, Image, Headline } from "@/components";

interface Props {
  img: string;
  title: string;
  subTitle?: string;
  isHomePage?: boolean;
  ratio?: string;
}

interface WrapperBoxProps extends BoxProps {
  isHomePage: boolean;
}

export default function Hero({
  title,
  img,
  isHomePage = false,
  ratio = "1200/740",
  subTitle,
}: Props) {
  return (
    <Ratio ratio={ratio}>
      <Image src={img} alt="" />
      <StyledContainer isHomePage={isHomePage}>
        <WrapperContent>
          {isHomePage ? (
            <Typography variant="BungeeText" width="max-content">
              {title}
            </Typography>
          ) : (
            <Headline title={title} subTitle={subTitle} />
          )}
        </WrapperContent>
      </StyledContainer>
    </Ratio>
  );
}

const StyledContainer = styled(Container, {
  shouldForwardProp: (propName) => {
    return propName !== "isHomePage";
  },
})<WrapperBoxProps>(({ isHomePage }) => {
  return {
    display: isHomePage ? "flex" : "block",
    justifyContent: "center",
  };
});

const WrapperContent = styled(Box)(() => {
  return {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
  };
});
