import { useRouter } from "next/router";
import { useMeasure } from "react-use";
import { Typography, styled, useTheme } from "@mui/material";

import { NewsPage } from "@/interfaces";
import { Box, Ratio, Image, Stack } from "@/components";

interface WrapperProps {
  heightHover: number;
}

interface Props {
  data: NewsPage;
}

export default function CardNew({ data }: Props) {
  const [ref, { height }] = useMeasure<HTMLDivElement>();

  const { thumbnail, title, content, id } = data;

  return (
    <Wrapper heightHover={height}>
      <Ratio ratio="320/345">
        {thumbnail && <Image src={thumbnail} alt="" style={{ borderRadius: "0.5rem" }} />}
        <Overlay className="overlay"></Overlay>

        <WrapperContent ref={ref} className="content">
          <Content id={data.id} content={data.description} />
        </WrapperContent>

        <Box sx={{ position: "absolute", bottom: "1rem", padding: "0 1rem" }}>
          <Title variant="h4">{title}</Title>
          <Box className="content2" sx={{ transition: "all .4s ease" }}></Box>
        </Box>
      </Ratio>
    </Wrapper>
  );
}

const Wrapper = styled(Box, {
  shouldForwardProp: (propName) => {
    return propName !== "heightHover";
  },
})<WrapperProps>(({ theme, heightHover }) => {
  return {
    width: "100%",
    overflow: "hidden",
    transition: "all .4s ease",
    cursor: "pointer",

    "&:hover .overlay": {
      opacity: ".6",
    },

    "&:hover .content2": {
      paddingTop: `${heightHover}px`,
    },

    "&:hover .content": {
      opacity: 1,
    },
  };
});

const Overlay = styled(Box)(({ theme }) => {
  return {
    position: "absolute",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    height: "100%",
    width: "100%",
    opacity: ".3",
    transition: ".4s ease",
    backgroundColor: "#242424",
    borderRadius: "0.5rem",
  };
});

const Title = styled(Typography)(({ theme }) => {
  return {
    display: "-webkit-box",
    WebkitLineClamp: 2,
    overflow: "hidden",
    WebkitBoxOrient: "vertical",
    minHeight: 36 * 2,
    fontWeight: 700,
    marginBottom: "0.5rem",
    color: theme.palette.common.white,
  };
});

interface ContentProps {
  id: number;
  content: string;
}

const Content = ({ id, content }: ContentProps) => {
  const { push } = useRouter();
  const theme = useTheme();

  return (
    <Box>
      <Text variant="p_medium">{content}</Text>
      <SeeMore direction="row">
        <Typography
          onClick={() => {
            push(`/news/${id}`);
          }}
          marginTop={1}
          color={theme.palette.common.white}
        >
          Tìm hiểu thêm
        </Typography>
      </SeeMore>
    </Box>
  );
};

const Text = styled(Typography)(({ theme }) => {
  return {
    display: "-webkit-box",
    WebkitLineClamp: 3,
    overflow: "hidden",
    WebkitBoxOrient: "vertical",
    minHeight: 36 * 2,
    fontWeight: 700,
    color: theme.palette.common.white,
  };
});

const SeeMore = styled(Stack)(({ theme }) => {
  return {
    cursor: "pointer",
  };
});

const WrapperContent = styled(Box)(({ theme }) => {
  return {
    position: "absolute",
    bottom: "1rem",
    padding: "0 1rem",
    zIndex: 3,
    opacity: 0,
    transition: "all .4s ease",
  };
});
