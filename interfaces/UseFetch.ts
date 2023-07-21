import { AxiosError } from "axios";

type ResponseType<T> = {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  items: T[];
};

type ResponseErrorType<T = any> = AxiosError<T>;

export type { ResponseType, ResponseErrorType };
