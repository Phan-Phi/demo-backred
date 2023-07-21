import { Button, styled } from "@mui/material";
import { useRouter } from "next/router";
import Box from "../Box/Box";
interface Props {
  text: string;
  link: string;
}

export default function ButtonBase({ text, link }: Props) {
  const router = useRouter();

  return (
    <StyledButton>
      <Button
        variant="contained"
        onClick={() => {
          router.push(link);
        }}
      >
        {text}
      </Button>
    </StyledButton>
  );
}

const StyledButton = styled(Box)(({ theme }) => {
  return {
    display: "flex",
    justifyContent: "center",
  };
});
