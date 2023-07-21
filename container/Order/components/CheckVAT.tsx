import React, { Dispatch, SetStateAction, useCallback } from "react";

import {
  Box,
  Stack,
  styled,
  Checkbox,
  Typography,
  FormControlLabel,
} from "@mui/material";
import { VATSchemaProps } from "@/yups";

type CheckVATProps = {
  checkVAT: boolean;
  setCheckVAT: (b: boolean) => void;
  onOpenVAT: () => void;
  setDataVAT: Dispatch<SetStateAction<VATSchemaProps[]>>;
};

export default function CheckVAT(props: CheckVATProps) {
  const { checkVAT, onOpenVAT, setCheckVAT, setDataVAT } = props;

  const handleChecked = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    let checked = event.target.checked;
    setCheckVAT(checked);

    if (checked) {
      onOpenVAT();
    } else {
      setDataVAT([]);
    }
  }, []);

  return (
    <StyledWrapper>
      <FormControlLabel
        label={<Label />}
        control={<Checkbox checked={checkVAT} onChange={handleChecked} />}
      />
    </StyledWrapper>
  );
}

const Label = () => {
  return (
    <Stack gap="4px" sx={{ userSelect: "none" }}>
      <StyledLabel>Yêu cầu xuất hóa đơn</StyledLabel>
      <StyledSubLabel>Vui lòng chọn nếu có yêu cầu xuất hóa đơn</StyledSubLabel>
    </Stack>
  );
};

const StyledLabel = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.p_medium,
    fontWeight: 600,
  };
});

const StyledSubLabel = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.p_small,
  };
});

const StyledWrapper = styled(Box)(() => {
  return {
    gap: 16,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  };
});
