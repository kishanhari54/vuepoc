import axios from "axios";
import tokenInterceptor from "./interceptors/tokenInterceptor";
/*
const apiBaseUrls = {
  baseUrl: "https://c-iota-dev31-apigateway.azure-api.net",
}; */

const axiosInstance = axios.create({
  /* baseURL: apiBaseUrls.baseUrl, // Replace with your API endpoint
  headers: {
    "Content-Type": "application/json",
    // Add any other necessary headers
 },  */
});

tokenInterceptor.install(axiosInstance);
export default axiosInstance;
