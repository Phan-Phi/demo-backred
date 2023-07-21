import { useMemo } from "react";
import { Grid, Typography, styled } from "@mui/material";

import { NewsPage } from "@/interfaces";
import { Box, ButtonBase } from "@/components";
import CardNew from "@/compositions/Card/CardNew";

interface Props {
  id: number;
  title: string;
  data: NewsPage[];
}

export default function CategoryItemSection({ data, id, title }: Props) {
  const render = useMemo(() => {
    if (data === undefined) return;

    const newData = data.filter((el) => el.meta.parent.id === id);

    return newData.map((el, idx) => {
      if (idx >= 3) return;
      return (
        <Grid item xs={4} key={idx}>
          <CardNew data={el} />
        </Grid>
      );
    });
  }, [data]);

  return (
    <Box marginBottom={5}>
      <Title variant="BungeeText">{title}</Title>

      <StyledBox>
        <Grid container spacing={2.5}>
          {render}
        </Grid>
      </StyledBox>

      <ButtonBase text="Xem Thêm" link="/" />
    </Box>
  );
}

const Title = styled(Typography)(({ theme }) => {
  return {
    textTransform: "uppercase",
  };
});

const StyledBox = styled(Box)(({ theme }) => {
  return {
    margin: "40px 0",
  };
});
