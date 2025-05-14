import { userApi } from "@/axios";
import { baseUrl } from "@/constants/app";
import { catchResponse } from "@/errors/catchResponse";
import { DocType, TaskType } from "@/types";

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
      `${baseUrl}/space?field=_id&value=${spaceId}`
    );
    if (response.status === 200) {
      return response.data.data[0];
    }
    throw new Error("unexpected response from server");
  } catch (error) {
    throw catchResponse(error);
  }
};

export const userFetchUsersBySpaceId = async (spaceId: string) => {
  try {
    const response = await userApi.get(
      `${baseUrl}/user?field=spaces&value=${spaceId}`
    );
    if (response.status === 200) {
      return response.data.data;
    }
    throw new Error("Unexpected response from server");
  } catch (error) {
    throw catchResponse(error);
  }
};

export const userFetchOwnTasks = async (userId: string) => {
  try {
    const response = await userApi.get(
      `${baseUrl}/task?field=userId&value=${userId}`
    );
    if (response.status === 200) {
      return response.data.data;
    }
    throw new Error("unexpected response from server");
  } catch (error) {
    throw catchResponse(error);
  }
};

export const userFetchTasksBySpaceId = async (spaceId: string) => {
  try {
    const response = await userApi.get(
      `${baseUrl}/task?field=spaceId&value=${spaceId}`
    );
    if (response.status === 200) {
      return response.data.data;
    }
    throw new Error("unexpected response from server");
  } catch (error) {
    throw catchResponse(error);
  }
};

export const userUpdateTaskStatus = async (
  taskId: string,
  updateType: string,
  updateData: Partial<TaskType>
) => {
  try {
    const response = await userApi.put(`${baseUrl}/task/${taskId}`, {
      updateData,
      updateType,
    });
    if (response.status === 200) {
      return {
        success: true,
        data: response.data.data,
        message: "Task updation succesfull",
      };
    }
    throw new Error("unexpected response from server");
  } catch (error) {
    return catchResponse(error);
  }
};

export const userCreateDocument = async (
  spaceId: string,
  author: string,
  title: string,
  data: Partial<DocType>
) => {
  try {
    const response = await userApi.post(`${baseUrl}/document`, {
      spaceId,
      author,
      title,
      ...data,
    });

    if (response.status === 201) {
      return { success: true, data: response.data.data };
    }
    throw new Error("Unexpected response from server");
  } catch (error) {
    return catchResponse(error);
  }
};

export const userGetDocuments = async (spaceId: string) => {
  try {
    const response = await userApi.get(
      `${baseUrl}/document?spaceId=${spaceId}`
    );
    console.log("docs", response.data.data);
    if (response.status == 200) {
      return response.data.data;
    }
  } catch (error) {
    throw catchResponse(error);
  }
};

export const userDeleteDocument = async (
  docId: string,
  data: Partial<DocType>
) => {
  try {
    const response = await userApi.put(`${baseUrl}/document?${docId}`, data);
    if (response.status === 200) {
      return response.data.data;
    }
    throw new Error("Unexpected response from server");
  } catch (error) {
    throw catchResponse(error);
  }
};

export const userUpdateDocument = async (
  docId: string,
  data: Partial<DocType>
) => {
  try {
    const response = await userApi.put(`${baseUrl}/document?${docId}`, data);
    if (response.status === 200) {
      return response.data.data;
    }
    throw new Error("Unexpected response from server");
  } catch (error) {
    throw catchResponse(error);
  }
};

export const userFetchChatsByRoom = async (room: string) => {
  try {
    const response = await userApi.get(`${baseUrl}/chat/${room}`);

    if (response.status === 200) {
      return response.data.data;
    }
    throw new Error("Unexpected response from server");
  } catch (error) {
    throw catchResponse(error);
  }
};
