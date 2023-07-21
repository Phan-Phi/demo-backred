import { useIntl } from "react-intl";
import { Typography, Stack, Container, useTheme } from "@mui/material";
import { useMedia } from "@/hooks";

const _404Page = () => {
  //   const { messages } = useIntl();
  //   const { isSmDown } = useMedia();
  //   const theme = useTheme();

  return (
    <Container
      sx={{
        marginY: 5,
      }}
    >
      <Stack
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
        spacing={2}
      >
        {/* <Typography
          variant={isSmDown ? "h4" : "h2"}
          color={theme.palette.primary.main}
          textAlign="center"
        >
          {messages["404message"] as string}
        </Typography> */}
      </Stack>
    </Container>
  );
};

export default _404Page;
