import { setLocale } from "yup";

export * from "./contact/contact";
export * from "./vat/vat";

setLocale({
  mixed: {
    required: "Trường này là bắt buộc",
  },
});
