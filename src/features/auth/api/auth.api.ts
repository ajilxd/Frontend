import axios from "axios";

import { baseUrl } from "@/constants/app";
import { catchResponse } from "@/errors/catchResponse";

export async function authSendOtp(email: string, role: string) {
  try {
    const response = await axios.post(`${baseUrl}/auth/sendotp?role=${role}`, {
      email,
    });
    if (response.status === 200) {
      return {
        success: true,
        message: "Otp sent succesfully",
      };
    }
    throw new Error("unexpected response from server");
  } catch (err) {
    return catchResponse(err);
  }
}

export async function authlogin(data: {
  email: string;
  otp: string;
  role: string;
}) {
  const { email, otp, role } = data;
  try {
    const response = await axios.post(`${baseUrl}/auth/login?role=${role}`, {
      email,
      otp,
    });
    if (response.status === 200) {
      return {
        success: true,
        data: response.data,
        message: "login was succesfull",
      };
    }
    throw new Error("unexpected response from server");
  } catch (error) {
    return catchResponse(error);
  }
}

export async function authlogout(role: string) {
  try {
    const response = await axios.get(`${baseUrl}/auth/logout?role=${role}`);
    if (response.status === 200) {
      return {
        success: true,
      };
    }
    throw new Error("unexpected response from server");
  } catch (error) {
    return catchResponse(error);
  }
}
