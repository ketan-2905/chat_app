import { ApiError } from "../../lib/types";

const isApiError = (error: any): error is ApiError => {
  return error && typeof error.message === "string";
};

export default isApiError;
