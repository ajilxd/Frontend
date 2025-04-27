import axios, { AxiosInstance } from "axios";

import { baseUrl } from "@/constants/app";

const createApi = (role: string) => {
  return axios.create({
    baseURL: baseUrl,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      "X-User-Role": role,
    },
  });
};

export const userApi = createApi("user");
export const ownerApi = createApi("owner");
export const managerApi = createApi("manager");
export const adminApi = createApi("admin");

export const setupInterceptors = ({
  apiInstance,
  role,
  navigate,
}: {
  apiInstance: AxiosInstance;
  role: string;
  navigate: (path: string) => void;
}) => {
  apiInstance.interceptors.request.use((config) => {
    console.log(`${role}AccessToken`);
    const accessToken = localStorage.getItem(`${role}AccessToken`);
    console.log("accessToken", accessToken);
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  });

  apiInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      console.log("error from the axios", error);
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const res = await axios.post(
            `${baseUrl}/refresh-token`,
            {},
            { withCredentials: true }
          );
          //   console.log("resposne", res);
          const newAccessToken = res.data.accessToken;
          //   console.log("new Access Token", newAccessToken);
          //   console.log("settig token for ", `${role}AccessToken`);
          localStorage.setItem(`${role}AccessToken`, newAccessToken);

          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          return apiInstance(originalRequest);
        } catch (err) {
          if (role === "admin") {
            navigate("/admin/login");
          } else if (role === "owner") {
            navigate("/owner/signin");
          } else {
            navigate("/auth/login-email");
          }

          return Promise.reject(err);
        }
      }

      return Promise.reject(error);
    }
  );
};
