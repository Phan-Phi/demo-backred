import { setLocale } from "yup";

export * from "./vat/vat";
export * from "./order/order";
export * from "./contact/contact";

setLocale({
  mixed: {
    required: "Trường này là bắt buộc",
  },
});
