import { Box, Ratio, Image } from "@/components";
import { Typography } from "@mui/material";

export default function HomeBanner() {
  return (
    <Box>
      <Ratio ratio="1200/740" bgcolor={"red"}>
        <Image src="/image/home-banner.png" alt="" />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "10%",
            transform: "translateY(-50%)",
          }}
        >
          <Typography variant="BungeeText">Ăn Thích Mê Ngon Khó Cưỡng</Typography>
        </Box>
      </Ratio>
    </Box>
  );
}
