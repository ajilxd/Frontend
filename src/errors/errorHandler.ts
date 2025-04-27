import axios from "axios";

type ErrorHandlerType = (err: unknown) => { message: string; status: number };

export const errorHandler: ErrorHandlerType = (error) => {
  if (!axios.isAxiosError(error)) {
    return {
      message: "Something went wrong during request setup",
      status: 500,
    };
  }

  const { request, response, message: nativeMessage } = error;

  if (response) {
    const status = response.status || 500;
    const message =
      response.data?.message ||
      response.data?.error ||
      response.statusText ||
      nativeMessage ||
      `Request failed with status ${status}`;
    return { message, status };
  } else if (request) {
    return {
      message: "Server timeout or no response received",
      status: 503,
    };
  } else {
    return {
      message: "An unknown error occurred",
      status: 500,
    };
  }
};
