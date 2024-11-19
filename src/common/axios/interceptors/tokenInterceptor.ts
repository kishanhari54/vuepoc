import {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { useRouter } from "vue-router";

export default {
  install(axiosInstance: AxiosInstance) {
    const router = useRouter();
    // Request Interceptor
    axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // Access user token (replace with your logic)
        const user = localStorage.getItem("user");
        if (user) {
          const token = JSON.parse(user).access_token;
          const subTenant = JSON.parse(user).sub_tenant_id;
          if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
            config.headers["X-Apigateway-Api-Userinfo"] = `${token}`;
          }
          const selectedTenantId = "5d003e36-3c76-4c20-95d8-037b9ff354ec"; // Replace with the actual tenant ID
          if (selectedTenantId) {
            config.headers["x-subtenant-id"] = subTenant || selectedTenantId; // Add selectedTenantId header
          }

          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error: AxiosError) => {
        // Handle request error
        debugger;
        return Promise.reject(error);
      }
    );

    // Response Interceptor (optional)
    axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        // Handle successful response
        return response;
      },
      (error: AxiosError) => {
        // Handle response error
        // Handle potential token refresh logic here
        if (error.status == 401) {
          console.log("UnAuthorized");
          router.push("/login");
        }
        return Promise.reject(error);
      }
    );
  },
};
