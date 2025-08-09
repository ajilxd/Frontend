import axios, { AxiosInstance } from "axios";

import { baseUrl } from "@/constants/app";

const createApi = (role: string): AxiosInstance => {
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

const setupInterceptors = ({
  apiInstance,
  role,
}: {
  apiInstance: AxiosInstance;
  role: string;
}) => {
  apiInstance.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem(`${role}AccessToken`);
    console.log("accessToken", accessToken);
    const excludeUrls = ["/owner/login", "/owner/register"];

    if (excludeUrls.some((url) => config.url && config.url.includes(url))) {
      return config;
    }

    if (accessToken && config.headers) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  });

  apiInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response?.status === 401 &&
        originalRequest &&
        originalRequest.url &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        try {
          const res = await axios.post(
            `${baseUrl}/refresh-token`,
            {},
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
                "X-User-Role": role,
              },
            }
          );

          const newAccessToken = res.data.data.accessToken;
          if (!newAccessToken) {
            throw new Error("No valid token found");
          }
          localStorage.setItem(`${role}AccessToken`, newAccessToken);

          if (originalRequest.headers) {
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;
          }

          return apiInstance(originalRequest);
        } catch (refreshError) {
          console.log(refreshError);
          if (role === "admin") {
            window.location.href = "/admin/signin";
          } else if (role === "owner") {
            window.location.href = "/owner/signin";
          } else {
            window.location.href = "/auth/login-email";
          }

          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};

setupInterceptors({ apiInstance: userApi, role: "user" });
setupInterceptors({ apiInstance: ownerApi, role: "owner" });
setupInterceptors({ apiInstance: managerApi, role: "manager" });
setupInterceptors({ apiInstance: adminApi, role: "admin" });
