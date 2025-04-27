import axios from "axios";

import { baseUrl } from "@/constants/app";
import { catchResponse } from "@/errors/catchResponse";

export const userLogout = async () => {
  try {
    const response = await axios.get(`${baseUrl}/user/logout`);
    if (response.status === 200) {
      return {
        success: true,
        message: "logout went succesfull",
      };
    }
    throw new Error("unexpected response from server");
  } catch (error) {
    return catchResponse(error);
  }
};
