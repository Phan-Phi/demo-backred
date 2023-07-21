import { object, string } from "yup";
import { validatePhoneNumber } from "../utils";
import { yupResolver } from "@hookform/resolvers/yup";

export interface ContactSchemaProps {
  name: string;
  email: string;
  phone_number: string;
  message: string;
}

export const ContactSchema = () => {
  return yupResolver(
    object().shape({
      name: string().required(),
      email: string().required().email("Định dạng email sai"),
      phone_number: validatePhoneNumber().required(),
      message: string().required(),
    })
  );
};

export const DefaultContactFormState = () => {
  return {
    name: "",
    email: "",
    phone_number: "",
    message: "",
  };
};
