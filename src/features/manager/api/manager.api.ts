import { managerApi } from "@/axios";
import { baseUrl } from "@/constants/app";
import { catchResponse } from "@/errors/catchResponse";
import { SpaceType, TaskType, UserType } from "@/types";

export const managerFetchUsers = async (managerId: string) => {
  try {
    const response = await managerApi.get(
      `${baseUrl}/manager/users/${managerId}`
    );
    if (response.status === 200) {
      return response.data.data;
    }
    throw new Error("unexpected response from server");
  } catch (error) {
    throw catchResponse(error);
  }
};

export const managerAddUser = async (data: Partial<UserType>) => {
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

export const managerFetchSpace = async (managerId: string) => {
  try {
    const response = await managerApi.get(
      `${baseUrl}/space?field=managers&&value=${managerId}`
    );
    if (response.status === 200) {
      return response.data.data;
    }
    throw new Error("unexpected response from server");
  } catch (error) {
    throw catchResponse(error);
  }
};

export const managerFetchSpaceBySpaceId = async (spaceId: string) => {
  try {
    const response = await managerApi.get(
      `${baseUrl}/space?field=_id&&value=${spaceId}`
    );
    if (response.status === 200) {
      return response.data.data;
    }
    throw new Error("unexpected response from server");
  } catch (error) {
    throw catchResponse(error);
  }
};

export const managerUpdateSpace = async (
  ownerId: string,
  spaceId: string,
  updateData: Partial<SpaceType>
) => {
  try {
    const response = await managerApi.put(`${baseUrl}/space`, {
      ...updateData,
      spaceId,
      ownerId,
    });
    if (response.status === 200) {
      return {
        success: true,
        data: response.data.data,
      };
    }
    throw new Error("unexpected response from server");
  } catch (error) {
    return catchResponse(error);
  }
};

// #Task management

export const managerAddTask = async (data: Partial<TaskType>) => {
  try {
    const response = await managerApi.post(`${baseUrl}/task`, data);
    if (response.status === 201) {
      return {
        success: true,
        data: response.data.data,
      };
    }
    throw new Error("Unexpected response from server");
  } catch (error) {
    return catchResponse(error);
  }
};

export const managerGetTasksByManagerId = async (managerId: string) => {
  try {
    const response = await managerApi.get(
      `${baseUrl}/task?field=creatorId&&value=${managerId}`
    );
    if (response.status === 200) {
      return response.data.data;
    }
    throw new Error("Unexpected response from server");
  } catch (error) {
    return catchResponse(error);
  }
};

export const managerGetTasksByTaskId = async (taskId: string) => {
  try {
    const response = await managerApi.get(
      `${baseUrl}/task?field=taskId&&value=${taskId}`
    );
    if (response.status === 200) {
      return response.data.data;
    }
    throw new Error("Unexpected response from server");
  } catch (error) {
    return catchResponse(error);
  }
};

export const managerGetTasksBySpaceId = async (spaceId: string) => {
  try {
    const response = await managerApi.get(
      `${baseUrl}/task?field=spaceId&&value=${spaceId}`
    );
    if (response.status === 200) {
      return response.data.data;
    }
    throw new Error("Unexpected response from server");
  } catch (error) {
    return catchResponse(error);
  }
};

export const managerUpdateTask = async (
  taskId: string,
  data: Partial<TaskType>
) => {
  try {
    const response = await managerApi.put(`${baseUrl}/task`, {
      taskId,
      ...data,
    });

    if (response.status === 200) {
      return {
        success: true,
        data: response.data.data,
      };
    }
    throw new Error("Unexpected response from server");
  } catch (error) {
    return catchResponse(error);
  }
};
