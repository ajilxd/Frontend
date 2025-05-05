import { ownerApi } from "@/axios";
import { baseUrl } from "@/constants/app";
import { catchResponse } from "@/errors/catchResponse";
import {
  ManagerType,
  OwnerLoginResponseType,
  ServerResponseType,
  SpaceType,
} from "@/types";

import { CheckoutPayment, CompanyDetailsType } from "../types";
import { CompanyDataType } from "../types/types.ownercontext";

export async function ownerSigninService(formData: {
  email: string;
  password: string;
}): Promise<ServerResponseType<OwnerLoginResponseType>> {
  try {
    const response = await ownerApi.post(`${baseUrl}/owner/login`, formData);

    if (response.status == 200) {
      return {
        success: true,
        message: "login went succesfull",
        data: response.data,
      };
    } else {
      throw new Error("unexpected response from the server");
    }
  } catch (error: unknown) {
    return catchResponse(error);
  }
}

export async function ownerSignupService(formData: {
  email: string;
  name: string;
  password: string;
}) {
  try {
    const response = await ownerApi.post(`${baseUrl}/owner/register`, formData);
    if (response.status === 201) {
      return {
        success: true,
        message: "Success Account created",
        data: response.data,
      };
    }
    throw new Error("unexpected response from server");
  } catch (error) {
    return catchResponse(error);
  }
}

export async function ownerOtpVerificationService(email: string, otp: string) {
  try {
    const response = await ownerApi.post(`${baseUrl}/owner/verify-otp`, {
      email,
      otp,
    });

    if (response.status === 200) {
      return {
        success: true,
        message: "Account created successfully",
      };
    }
    throw new Error(`Unexpected response from server`);
  } catch (error: unknown) {
    return catchResponse(error);
  }
}

export async function forgetPasswordService(formData: { email: string }) {
  try {
    const response = await ownerApi.post(
      `${baseUrl}/owner/forget-password`,
      formData
    );
    if (response.status === 200) {
      return {
        success: true,
      };
    }
    throw new Error("Unexpected response from server");
  } catch (error: unknown) {
    return catchResponse(error);
  }
}

export async function resetPasswordService(formData: {
  email: string;
  password: string;
  token: string;
}) {
  try {
    const response = await ownerApi.post(
      `${baseUrl}/owner/reset-password`,
      formData
    );
    console.log(response);
    if (response.status === 200) {
      return {
        success: true,
        message: "Otp is verified ",
      };
    }
    throw new Error("unexpected response from server");
  } catch (error: unknown) {
    return catchResponse(error);
  }
}

export async function ownerLogoutService() {
  try {
    await ownerApi.get(`${baseUrl}/owner/logout`);
    return { success: true, message: "Logout went successfull" };
  } catch (err) {
    return catchResponse(err);
  }
}

// Owner api for handling subscriptions and payment

export async function ownerFetchSubscriptions() {
  try {
    const response = await ownerApi.get(`${baseUrl}/owner/subscriptions`);
    if (response.status === 200) {
      return {
        success: true,
        data: response.data,
        message: "subscription fetching went succesfull",
      };
    }
    throw new Error("unxpected response from server");
  } catch (error) {
    return catchResponse(error);
  }
}

export async function ownerPaymentCheckoutService(
  value: CheckoutPayment<string>
) {
  console.log("input for subscription", value);
  try {
    const response = await ownerApi.post(
      `${baseUrl}/payment/create-checkout-session`,
      value
    );
    if (response.status == 200) {
      return {
        success: true,
        data: response.data,
        message: "Payment session got created succesfull",
      };
    }
    throw new Error("unexpected response from server");
  } catch (error) {
    return catchResponse(error);
  }
}

export async function ownerFetchOwnSubscription(ownerId: string) {
  try {
    const response = await ownerApi.get(
      `${baseUrl}/owner/subscription/${ownerId}`
    );

    if (response.status === 200) {
      return {
        success: true,
        data: response.data,
        message: "owner subscription is fetched",
      };
    }
    throw new Error("unexpected response from server");
  } catch (err) {
    return catchResponse(err);
  }
}

export async function ownerCancelSubscriptionService(id: string) {
  try {
    const response = await ownerApi.delete(
      `${baseUrl}/payment/cancel-subscription/${id}`
    );
    if (response.status === 200) {
      return {
        success: true,
        message: "subscription cancelled succesfully",
      };
    }
    throw new Error("unexpected response from server");
  } catch (error) {
    return catchResponse(error);
  }
}

// Owner api for handling invoice ops

export async function ownerFetchInvoices(id: string) {
  try {
    const response = await ownerApi.get(`${baseUrl}/owner/invoices/${id}`);
    if (response.status === 200) {
      return {
        success: true,
        data: response.data,
        message: "Data fetched succesfully - owner invoices",
      };
    }
    throw new Error("unexpected response from server");
  } catch (error) {
    return catchResponse(error);
  }
}

// Owner api for handling company ops

export async function ownerFetchCompanyDetails(ownerId: string) {
  try {
    const response = await ownerApi.get(`${baseUrl}/owner/company/${ownerId}`);
    if (response.status === 200) {
      return {
        success: true,
        data: response.data,
        message: response.data.message,
      };
    }
    throw new Error("unexpected response from server");
  } catch (error) {
    return catchResponse(error);
  }
}

export async function ownerEditCompanyDetails(data: CompanyDataType) {
  try {
    const response = await ownerApi.put(`${baseUrl}/owner/company`, data);
    if (response.status === 200) {
      return {
        success: true,
        data: response.data.data,
        message: response.data.message,
      };
    }
    throw new Error("unexpected response from server");
  } catch (error) {
    return catchResponse(error);
  }
}

export async function ownerAddCompanyDetails(data: CompanyDetailsType) {
  try {
    console.log(data);
    const response = await ownerApi.post(`${baseUrl}/owner/company`, data);
    if (response.status === 201) {
      return {
        success: true,
        message: "company details added succesfully",
        data: response.data,
      };
    }
    throw new Error("unexpected response from server");
  } catch (error) {
    return catchResponse(error);
  }
}

// Owner api for handling Managers ops

export async function ownerFetchAllManagers(id: string) {
  try {
    const response = await ownerApi.get(`${baseUrl}/owner/managers/${id}`);
    if (response.status === 200) {
      return response.data.data;
    }

    if (response.status === 204) {
      throw new Error("No managers for owner");
    }
    throw new Error("unexpected response from server");
  } catch (err) {
    throw catchResponse(err);
  }
}

export async function ownerToggleManagerStatus(
  managerId: string,
  ownerId: string
) {
  try {
    const response = await ownerApi.patch(
      `${baseUrl}/owner/managers/${managerId}`,
      {
        ownerId,
      }
    );
    if (response.status === 200) {
      return {
        success: true,
        data: response.data.data,
        message: "Manager status updated succesfully",
      };
    }
    throw new Error("unexpected response from server");
  } catch (err) {
    return catchResponse(err);
  }
}

export async function ownerCreateManager(managerData: Partial<ManagerType>) {
  try {
    const response = await ownerApi.post(
      `${baseUrl}/owner/managers`,
      managerData
    );
    if (response.status === 201) {
      return {
        success: true,
        data: response.data,
        message: "manager created successfully",
      };
    }
    throw new Error("unexpected response from server");
  } catch (err) {
    return catchResponse(err);
  }
}

// Owner api for handling Space ops

export const ownerFetchSpaceBySpaceId = async (spaceId: string) => {
  try {
    const response = await ownerApi.get(
      `${baseUrl}/space?field=_id&&value=${spaceId}`
    );
    if (response.status === 200) {
      return response.data.data[0];
    }
    throw new Error("unexpected response from server");
  } catch (error) {
    return catchResponse(error);
  }
};

export const ownerUpdateSpace = async (
  ownerId: string,
  spaceId: string,
  updateData: Partial<SpaceType>
) => {
  try {
    const response = await ownerApi.put(`${baseUrl}/space`, {
      ...updateData,
      spaceId,
      ownerId,
    });
    if (response.status === 200) {
      return {
        success: true,
        data: response.data.data,
        message: response.data.message,
      };
    }
    throw new Error("unexpected response from server");
  } catch (error) {
    return catchResponse(error);
  }
};

export const ownerAddSpace = async (
  ownerId: string,
  data: Partial<SpaceType>
) => {
  try {
    const response = await ownerApi.post(`${baseUrl}/space`, {
      ...data,
      ownerId,
    });
    if (response.status === 201) {
      return {
        success: true,
        data: response.data.data,
        message: response.data.message,
      };
    }
    throw new Error("Unexpected response from server");
  } catch (error) {
    return catchResponse(error);
  }
};

export const ownerFetchSpace = async (ownerId: string) => {
  try {
    const response = await ownerApi.get(
      `${baseUrl}/space?field=owner&&value=${ownerId}`
    );
    if (response.status === 200) {
      return response.data.data;
    }
    throw new Error("unexpected response from server");
  } catch (error) {
    throw catchResponse(error);
  }
};
