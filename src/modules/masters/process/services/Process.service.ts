import axiosInstance from "@/common/axios/axiosinstance";
import { Process } from "@/common/interfaces/Process.interface";

// Create a composable for process functionality
export function useProcessService() {
  const baseUrl = "http://localhost:3000/processes";

  return {
    async createProcess(process: Process): Promise<Process> {
      const response = await axiosInstance.post(baseUrl, process, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    },

    async updateProcess(id: string, data: Partial<Process>): Promise<Process> {
      const response = await axiosInstance.patch(`${baseUrl}/${id}`, data, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    },

    async getProcess(id: string): Promise<Process> {
      const response = await axiosInstance.get(`${baseUrl}/${id}`);
      return response.data;
    },
  };
}
