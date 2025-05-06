import { userApi } from "@/axios";
import { baseUrl } from "@/constants/app";
import { catchResponse } from "@/errors/catchResponse";

export const userLogout = async () => {
  try {
    const response = await userApi.get(`${baseUrl}/user/logout`);
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

export const userFetchSpaces = async (userId: string) => {
  try {
    const response = await userApi.get(
      `${baseUrl}/space?field=userId&&value=${userId}`
    );

    if (response.status === 200) {
      return response.data.data;
    }
  } catch (error) {
    throw catchResponse(error);
  }
};

export const userFetchSpaceBySpaceId = async (spaceId: string) => {
  try {
    const response = await userApi.get(
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
