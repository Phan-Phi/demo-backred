import { LoadingButton as MuiLoadingButton, LoadingButtonProps } from "@mui/lab";

import { styled } from "@mui/material";

const NewsLoadingButton = (props: LoadingButtonProps) => {
  return <StyledLoadingButton {...props} />;
};

const StyledLoadingButton = styled(MuiLoadingButton)(({ theme }) => {
  return {
    textTransform: "capitalize",
    whiteSpace: "nowrap",
    padding: "16px 24px",
    borderRadius: theme.spacing(10),
  };
});

export default NewsLoadingButton;
