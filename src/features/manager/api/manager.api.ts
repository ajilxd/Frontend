import { managerApi } from "@/axios";
import { baseUrl } from "@/constants/app";
import { catchResponse } from "@/errors/catchResponse";
import {
  DocType,
  ManagerType,
  MeetingType,
  SpaceType,
  TaskType,
  UserType,
} from "@/types";

// manager data

export const managerGetData = async (managerId: string) => {
  try {
    const response = await managerApi.get(
      `${baseUrl}/manager?field=_id&value=${managerId}`
    );
    if (response.status === 200) {
      return response.data.data[0];
    }
    throw new Error("unexpected response from server");
  } catch (error) {
    throw catchResponse(error);
  }
};

// manager profile updation

export const managerProfileUpdate = async (data: Partial<ManagerType>) => {
  try {
    const response = await managerApi.put(`${baseUrl}/manager/profile`, data);
    if (response.status === 200) {
      return {
        data: response.data.data,
        success: true,
        message: "profile updation went succesfull",
      };
    }
    throw new Error("unexpected response from server");
  } catch (error) {
    return catchResponse(error);
  }
};

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

// space management

export const managerFetchSpace = async (managerId: string) => {
  try {
    const response = await managerApi.get(
      `${baseUrl}/space?field=managers&value=${managerId}`
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

export const managerUpdateSpaceUsers = async (
  managerId: string,
  spaceId: string,
  updateData: Partial<SpaceType>
) => {
  try {
    const response = await managerApi.post(`${baseUrl}/space/users`, {
      ...updateData,
      spaceId,
      managerId,
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

export const managerSpaceMemberStatusUpdate = async (
  spaceId: string,
  managerId: string,
  memberId: string,
  data: { designation: string; statusUpdate: boolean }
) => {
  try {
    const response = await managerApi.put(`${baseUrl}/space/users`, {
      ...data,
      spaceId,
      managerId,
      memberId,
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
      `${baseUrl}/task?field=creatorId&value=${managerId}`
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
      `${baseUrl}/task?field=taskId&value=${taskId}`
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
      `${baseUrl}/task?field=spaceId&value=${spaceId}`
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

export const managerCreateDocument = async (
  spaceId: string,
  author: string,
  title: string,
  data: Partial<DocType>
) => {
  try {
    const response = await managerApi.post(`${baseUrl}/document`, {
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

export const managerGetDocuments = async (spaceId: string) => {
  try {
    const response = await managerApi.get(
      `${baseUrl}/document?spaceId=${spaceId}`
    );
    // console.log("docs", response.data.data);
    if (response.status == 200) {
      return response.data.data;
    }
  } catch (error) {
    throw catchResponse(error);
  }
};

export const mangerDeleteDocument = async (docId: string) => {
  try {
    const response = await managerApi.delete(`${baseUrl}/document?${docId}`);
    if (response.status === 200) {
      return {
        success: true,
        data: response.data.data,
      };
    }
    throw new Error("Unexpected response from server");
  } catch (error) {
    throw catchResponse(error);
  }
};

export const managerUpdateDocument = async (
  docId: string,
  data: Partial<DocType>
) => {
  try {
    const response = await managerApi.put(`${baseUrl}/document/${docId}`, data);
    console.log(response);
    if (response.status === 200) {
      return { data: response.data.data, success: true };
    }
    throw new Error("Unexpected response from server");
  } catch (error) {
    return catchResponse(error);
  }
};

// chats

export const managerFetchChatsByRoom = async (room: string) => {
  try {
    const response = await managerApi.get(`${baseUrl}/chat/${room}`);

    if (response.status === 200) {
      return response.data.data;
    }
    throw new Error("Unexpected response from server");
  } catch (error) {
    throw catchResponse(error);
  }
};

export const managerMakeCall = async (data: MeetingType) => {
  try {
    const response = await managerApi.post(`${baseUrl}/meeting`, data);
    if (response.status === 201) {
      return { success: true, data: response.data.data };
    }
    throw new Error("Unexpected response from server");
  } catch (error) {
    return catchResponse(error);
  }
};

export const managerFetchMeetings = async (spaceId: string) => {
  try {
    const response = await managerApi.get(`${baseUrl}/meeting/${spaceId}`);
    if (response.status == 200) {
      return response.data.data;
    }
    throw new Error("Unexpected response from server");
  } catch (error) {
    throw catchResponse(error);
  }
};

export const managerJoinMeeting = async (data: {
  joineeId: string;
  role: string;
  meetingId: string;
  spaceId: string;
}) => {
  try {
    const response = await managerApi.post(`${baseUrl}/meeting/join`, data);
    if (response.status == 200) {
      return { success: true, data: response.data.data };
    }
  } catch (error) {
    return catchResponse(error);
  }
};

export const managerEndMeeting = async (data: {
  role: string;
  hostId: string;
  meetingId: string;
  spaceId: string;
}) => {
  try {
    const response = await managerApi.post(`${baseUrl}/meeting/end`, data);
    if (response.status === 200) {
      return {
        success: true,
        message: "Meeting ended succesfully",
      };
    }
  } catch (error) {
    return catchResponse(error);
  }
};

export const managerLeaveMeeting = async (data: {
  userId: string;
  meetingId: string;
  role: string;
  spaceId: string;
  name: string;
}) => {
  try {
    const response = await managerApi.post(`${baseUrl}/meeting/leave`, data);
    if (response.status === 200) {
      return { success: true };
    }
    throw new Error("unexpected response from server");
  } catch (error) {
    return catchResponse(error);
  }
};

// notifications

export const managerFetchNotifications = async (
  companyId: string,
  receiverId: string
) => {
  try {
    const res = await managerApi.get(
      `${baseUrl}/manager/notifications?companyId=${companyId}&receiverId=${receiverId}`
    );
    if (res.status === 200 || res.status === 204) {
      return { success: true, data: res.data.data };
    }
    throw new Error("unexpected response from server");
  } catch (error) {
    return catchResponse(error);
  }
};

//companyMembers

export const managerFetchCompanyMembers = async (companyId: string) => {
  try {
    console.log("hey im member fetcher");
    if (!companyId) throw new Error("Invalid companyId");
    const res = await managerApi.get(`${baseUrl}/manager/members/${companyId}`);
    console.log("fetching members", res);
    if (res.status === 200 || res.status === 204) {
      return {
        success: true,
        data: res.data.data || [],
        message: "Succesfully fetched chats ",
      };
    }
    throw new Error("unexpected response from server");
  } catch (error) {
    return catchResponse(error);
  }
};
