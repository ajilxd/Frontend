import { adminApi } from "@/axios";
import { catchResponse } from "@/errors/catchResponse";

import { adminSigninRequestType } from "./admin.dto";
import { SubscriptionType } from "../types/admin.model";

const baseUrl = import.meta.env.VITE_API_URL;

export const adminSignInService = async (data: adminSigninRequestType) => {
  try {
    const res = await adminApi.post(`${baseUrl}/admin/login`, data);
    return {
      success: true,
      message: "login went succesful",
      data: res.data,
    };
  } catch (Error) {
    return catchResponse(Error);
  }
};

export const adminLogOutService = async () => {
  try {
    const res = await adminApi.get(`${baseUrl}/admin/logout`);
    if (res.status === 200) {
      return {
        success: true,
        message: "Logout succesfull",
      };
    }
    throw new Error("Unexpected error occured");
  } catch (err) {
    return catchResponse(err);
  }
};

export const adminFetchSubscriptionsService = async () => {
  try {
    const res = await adminApi.get(`${baseUrl}/admin/subscriptions`);
    return {
      success: true,
      data: res.data.data,
      message: "subscription fetched succesfully",
    };
  } catch (error) {
    catchResponse(error);
  }
};

export const adminAddSubscriptionService = async (data: SubscriptionType) => {
  try {
    const res = await adminApi.post(`${baseUrl}/admin/subscription`, data);
    if (res.status === 201) {
      return {
        success: true,
        data: res.data.data,
        message: "data creation went succesful",
      };
    }
    throw new Error("unexpected response from server");
  } catch (error) {
    return catchResponse(error);
  }
};

export const adminFetchOwners = async (page: number, itemPerPage: number) => {
  try {
    const response = await adminApi.get(
      `${baseUrl}/admin/owners?page=${page}&itemPerPage=${itemPerPage}`
    );
    console.log("response from server", response);
    if (response.status === 200) {
      return {
        success: true,
        data: response.data,
        message: "fetching owners went successful",
      };
    }
    throw new Error("unexpected response from server");
  } catch (err) {
    return catchResponse(err);
  }
};

export async function adminToggleOwnerStatus(id: string) {
  try {
    const response = await adminApi.patch(
      `${baseUrl}/admin/toggle-owner-status/${id}`
    );
    console.log(response);
    if (response.status === 200) {
      return {
        success: true,
        data: response.data,
        message: "owner updation went succesfull",
      };
    }
    throw new Error("unexpected response from server");
  } catch (err) {
    return catchResponse(err);
  }
}

export async function adminToggleSubscriptionStatus(id: string) {
  try {
    const response = await adminApi.patch(
      `${baseUrl}/admin/toggle-owner-status/${id}`
    );
    if (response.status === 200) {
      return {
        success: true,
        data: response.data,
        message: "subscription updation went sucessfull",
      };
    }
    throw new Error("unexpected response from server");
  } catch (error) {
    return catchResponse(error);
  }
}
