import { userApi } from "@/axios";
import { baseUrl } from "@/constants/app";
import { catchResponse } from "@/errors/catchResponse";
import { DocType, MeetingType, TaskType, UserType } from "@/types";

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

//get user data

export const userGetData = async (userId: string) => {
  try {
    console.log("hey im profile getter for user");
    const response = await userApi.get(
      `${baseUrl}/user?field=_id&value=${userId}`
    );
    console.log(response.data);
    if (response.status === 200) {
      return response.data.data[0];
    }
  } catch (error) {
    throw catchResponse(error);
  }
};

// profile updation

export const userProfileUpdate = async (data: Partial<UserType>) => {
  try {
    const response = await userApi.put(`${baseUrl}/user`, data);
    if (response.status === 200) {
      return {
        success: true,
        message: "updation went succesfull",
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
    const response = await userApi.put(`${baseUrl}/document/${docId}`, data);
    if (response.status === 200) {
      return {data:response.data.data,success:true};
    }
    throw new Error("Unexpected response from server");
  } catch (error) {
    return catchResponse(error);
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

export const userMakeCall = async (data: MeetingType) => {
  try {
    const response = await userApi.post(`${baseUrl}/meeting`, data);
    if (response.status === 201) {
      return { success: true, data: response.data.data };
    }
    throw new Error("Unexpected response from server");
  } catch (error) {
    return catchResponse(error);
  }
};

export const userFetchMeetings = async (spaceId: string) => {
  try {
    const response = await userApi.get(`${baseUrl}/meeting/${spaceId}`);
    if (response.status == 200) {
      return response.data.data;
    }
    throw new Error("Unexpected response from server");
  } catch (error) {
    throw catchResponse(error);
  }
};

export const userJoinMeeting = async (data: {
  joineeId: string;
  role: string;
  meetingId: string;
  spaceId: string;
}) => {
  try {
    const response = await userApi.post(`${baseUrl}/meeting/join`, data);
    if (response.status == 200) {
      return { success: true, data: response.data.data };
    }
  } catch (error) {
    return catchResponse(error);
  }
};

export const userEndMeeting = async (data: {
  role: string;
  hostId: string;
  meetingId: string;
  spaceId: string;
}) => {
  try {
    const response = await userApi.post(`${baseUrl}/meeting/end`, data);
    if (response.status === 200) {
      return {
        success: true,
        message: "Meeting ended succesfully",
      };
    }
    throw new Error("unexpected response from server");
  } catch (error) {
    return catchResponse(error);
  }
};

export const userLeaveMeeting = async (data: {
  userId: string;
  meetingId: string;
  role: string;
  spaceId: string;
  name: string;
}) => {
  try {
    const response = await userApi.post(`${baseUrl}/meeting/leave`, data);
    if (response.status === 200) {
      return { success: true };
    }
    throw new Error("unexpected response from server");
  } catch (error) {
    return catchResponse(error);
  }
};


export const userFetchNotifications =async (companyId:string,receiverId:string)=>{
  try {
    const res = await userApi.get(`${baseUrl}/user/notifications?companyId=${companyId}&receiverId=${receiverId}`)
    if(res.status ===200 || res.status === 204){
      return {success:true,data:res.data.data}
    }
    throw new Error("unexpected response from server")
  } catch (error) {
    return catchResponse(error)
  }
}
