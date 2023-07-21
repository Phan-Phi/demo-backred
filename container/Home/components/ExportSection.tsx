import { Button, Typography, styled } from "@mui/material";

import { Box, Ratio, Image } from "@/components";
import { HomePage } from "@/interfaces";
import { useCart } from "@/hooks";

type ExportSectionProps = {
  data: Pick<HomePage, "export_cta" | "local_cta" | "local_image">;
};

export default function ExportSection({ data }: ExportSectionProps) {
  const { isExported, setIsExported } = useCart();

  return (
    <Ratio ratio="1200/324">
      <Image src={data.local_image} alt="" style={{ objectFit: "cover" }} />

      <Content>
        <Text>{isExported ? data.export_cta : data.local_cta}</Text>
        <Button
          variant="contained"
          onClick={() => {
            isExported === true ? setIsExported(false) : setIsExported(true);
          }}
        >
          Xem Ngay
        </Button>
      </Content>
    </Ratio>
  );
}

const Content = styled(Box)(({ theme }) => {
  return {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    width: "100%",
    textAlign: "center",
  };
});

const Text = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.BungeeText,
    display: "block",
    marginBottom: "1.25rem",

    [theme.breakpoints.down("md")]: {
      ...theme.typography.p_large,
      fontWeight: "700 !important",
      marginBottom: "1rem",
    },
  };
});
