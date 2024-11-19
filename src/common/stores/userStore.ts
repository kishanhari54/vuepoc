import axiosInstance from "@/common/axios/axiosinstance";
import { Credentials, User } from "@/common/interfaces/userStore.interface";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

export const useUserStore = defineStore("user", () => {
  const user = ref<User | null>(null); // Type the user state
  const router = useRouter();

  const login = async (credentials: Credentials) => {
    try {
      // Get the base URL and login URL from environment variables
      const baseUrl = process.env.VUE_APP_API_BASE_URL;
      const loginUrl = process.env.VUE_APP_LOGIN_URL;

      if (!baseUrl || !loginUrl) {
        throw new Error(
          "API URLs are not defined in the environment variables."
        );
      }

      const response = await axiosInstance.post(`${baseUrl}${loginUrl}`, {
        UserName: credentials.email,
        Password: credentials.password,
      });

      user.value = response.data;
      localStorage.setItem("user", JSON.stringify(response.data));

      router.push("/alerts");
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  const logout = () => {
    user.value = null;
    localStorage.removeItem("user");
  };

  return { user, login, logout };
});
