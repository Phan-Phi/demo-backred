import React from "react";
import NumberFormatCustom from "./NumberFormat";

const VNDCurrency = (
  props: React.ComponentPropsWithoutRef<typeof NumberFormatCustom>
) => {
  return (
    <NumberFormatCustom
      thousandSeparator="."
      decimalSeparator=","
      suffix=" VNĐ"
      {...props}
    />
  );
};

export default VNDCurrency;
