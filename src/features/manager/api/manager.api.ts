import { managerApi } from "@/axios";
import { baseUrl } from "@/constants/app";
import { catchResponse } from "@/errors/catchResponse";

import {
  SpaceStatusType,
  SpaceVisibilityType,
} from "../pages/Dashboard/Spaces";

export type UserType = {
  name: string;
  email: string;
  isAvailable?: boolean;
  isBlocked?: boolean;
  role?: string;
  managerId: string;
  refreshToken?: string;
  image?: string;
  ownerId?: string;
};

export type SpaceType = {
  name: string;
  description: string;
  visibility: SpaceVisibilityType;
  status: SpaceStatusType;
  tags: string[];
  companyId: string;
  owner: string;
  spaceOwner: string;
  createdBy: string;
  team?: object;
  _id: string;
};

export const managerFetchUser = async (managerId: string) => {
  try {
    const response = await managerApi.get(
      `${baseUrl}/manager/users/${managerId}`
    );
    if (response.status === 200) {
      return {
        success: true,
        data: response.data,
        message: "users fetched succesfully",
      };
    }
    throw new Error("unexpected response from server");
  } catch (error) {
    return catchResponse(error);
  }
};

export const managerAddUser = async (data: UserType) => {
  try {
    const response = await managerApi.post(`${baseUrl}/manager/users`, data);
    if (response.status == 200) {
      return {
        success: true,
        data: response.data,
        message: "data added succesfully",
      };
    }
    throw new Error("unexpected response from server");
  } catch (error) {
    return catchResponse(error);
  }
};

export const managerToggleUserStatus = async (
  userId: string,
  managerId: string
) => {
  try {
    const response = await managerApi.patch(
      `${baseUrl}/manager/users/${userId}`,
      {
        managerId,
      }
    );
    if (response.status === 200) {
      return {
        success: true,
        message: "user details updated succesfully",
      };
    }
    throw new Error("unexpected response from server");
  } catch (error) {
    return catchResponse(error);
  }
};

export const managerLogout = async () => {
  try {
    const response = await managerApi.get(`${baseUrl}/manager/logout`);
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

export const managerAddSpace = async (data: SpaceType) => {
  try {
    const response = await managerApi.post(`${baseUrl}/space`, data);
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

export const managerFetchSpace = async (managerId: string) => {
  try {
    const response = await managerApi.get(
      `${baseUrl}/space?field=managers&&value=${managerId}`
    );
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

export const managerFetchSpaceBySpaceId = async (spaceId: string) => {
  try {
    const response = await managerApi.get(
      `${baseUrl}/space?field=_id&&value=${spaceId}`
    );
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

export const managerUpdateSpace = async (
  managerId: string,
  spaceId: string,
  updateData: Partial<SpaceType>
) => {
  try {
    const response = await managerApi.put(`${baseUrl}/space`, {
      ...updateData,
      spaceId,
      managerId,
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
