import axios from "axios";

import { errorHandler } from "./errorHandler";

export const catchResponse = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const { status, message } = errorHandler(error);
    return { status, message, success: false } as const;
  }
  return {
    status: 500,
    message: "something went wrong",
    success: false,
  } as const;
};
