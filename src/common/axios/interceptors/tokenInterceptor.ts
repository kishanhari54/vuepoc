import {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { useRouter } from "vue-router";

export default {
  install(axiosInstance: AxiosInstance) {
    // Create a function to install the interceptors
    const setupInterceptors = () => {
      const router = useRouter(); // Access the router inside a function

      // Request Interceptor
      axiosInstance.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
          const { token, subTenant } = getUserTokenDetails() || {};

          if (token) {
            // Set Authorization headers if token exists
            config.headers["Authorization"] = `Bearer ${token}`;
            config.headers["X-Apigateway-Api-Userinfo"] = token;

            // Set tenant-specific headers
            const selectedTenantId = "5d003e36-3c76-4c20-95d8-037b9ff354ec"; // Replace with actual tenant ID
            config.headers["x-subtenant-id"] = subTenant || selectedTenantId;
          }

          return config;
        },
        (error: AxiosError) => {
          // Log or handle request error appropriately
          return Promise.reject(error);
        }
      );

      // Response Interceptor
      axiosInstance.interceptors.response.use(
        (response: AxiosResponse) => {
          // Handle successful response
          return response;
        },
        (error: AxiosError) => {
          // Handle response errors, particularly for unauthorized (401) errors
          if (error.response?.status === 401) {
            console.error("Unauthorized access. Redirecting to login.");
            router.push("/login");
          }

          return Promise.reject(error);
        }
      );
    };

    // Call the function to set up interceptors
    setupInterceptors();
  },
};

// Helper function to get user details and token from localStorage
const getUserTokenDetails = () => {
  const user = localStorage.getItem("user");
  if (!user) return null;

  const parsedUser = JSON.parse(user);
  return {
    token: parsedUser?.access_token,
    subTenant: parsedUser?.sub_tenant_id,
  };
};

/*import {
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

*/
