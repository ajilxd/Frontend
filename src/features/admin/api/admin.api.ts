import { adminApi } from "@/axios";
import { catchResponse } from "@/errors/catchResponse";

import { adminSigninRequestType } from "./admin.dto";
import { SubscriptionType } from "@/types";

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

export const adminFetchSubscriptions = async (
  page: number,
  itemPerPage: number,
  search: string,
  billingCycle: string,
  status: string
) => {
  try {
    const res = await adminApi.get(
      `${baseUrl}/admin/subscriptions?page=${page}&itemPerPage=${itemPerPage}&search=${search}&billingCycle=${billingCycle}&status=${status}`
    );
    if (res.status === 200) {
      return res.data.data;
    }

    throw new Error("Unexpected response from server");
  } catch (error) {
    throw catchResponse(error);
  }
};

export const adminAddSubscriptionService = async (
  data: Partial<SubscriptionType>
) => {
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

    if (response.status === 200) {
      return response.data.data;
    }

    if (response.status === 204) {
      return [];
    }
    throw new Error("unexpected response from server");
  } catch (err) {
    throw catchResponse(err);
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

export async function adminEditSubscription(
  subscriptionId: string,
  data: Partial<SubscriptionType>
) {
  try {
    const res = await adminApi.put(
      `${baseUrl}/admin/subscription/${subscriptionId}`,
      data
    );
    if (res.status === 200) {
      return {
        success: true,
        message: "updation went succesful",
      };
    }
    throw new Error("Unexpected response from server");
  } catch (error) {
    return catchResponse(error);
  }
}

export async function adminToggleSubscriptionStatus(id: string) {
  try {
    const response = await adminApi.patch(
      `${baseUrl}/admin/toggle-subscription-status/${id}`
    );
    if (response.status === 200) {
      return {
        success: true,
        data: response.data,
        message: "subscription status changed  sucessfully",
      };
    }
    throw new Error("unexpected response from server");
  } catch (error) {
    return catchResponse(error);
  }
}

export async function adminFetchAllUsers(
  page: Number,
  itemPerPage: Number,
  search: String,
  role: String,
  status: String
) {
  try {
    if (!page || !itemPerPage) {
      throw new Error("Page and itemPerpage is missing");
    }
    const response = await adminApi.get(
      `${baseUrl}/admin/users?page=${page}&itemPerPage=${itemPerPage}&search=${search}&role=${role}&$status=${status}`
    );
    if (response.status === 200) {
      return response.data.data;
    }
    throw new Error("Unexpected response from server");
  } catch (error) {
    throw catchResponse(error);
  }
}

export async function adminBlockUser(role: string, id: string, block: boolean) {
  try {
    const payload = { role, id, block };
    const response = await adminApi.patch(`${baseUrl}/admin/users`, payload);
    if (response.status === 200) {
      return {
        success: true,
      };
    }
    throw new Error("Unexpected response from server");
  } catch (error) {
    return catchResponse(error);
  }
}

export async function adminFetchAllTransactions(
  page: number,
  itemPerPage: number,
  search: "" | string,
  status: "" | "fail" | "success"
) {
  try {
    const response = await adminApi.get(
      `${baseUrl}/admin/transactions?page=${page}&itemPerPage=${itemPerPage}&search=${search}&status=${status}`
    );
    if (response.status === 200) {
      return response.data.data;
    }
    throw new Error("unexpected response from server");
  } catch (error) {
    return catchResponse(error);
  }
}
