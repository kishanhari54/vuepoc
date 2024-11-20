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

    async getProcesses(plantId: number | null = null): Promise<Process[]> {
      const url = plantId ? `${baseUrl}?plantId=${plantId}` : baseUrl;
      const response = await axiosInstance.get(url);
      return response.data;
    },

    async toggleProcessStatus(process: Process): Promise<Process> {
      const response = await axiosInstance.patch(
        `${baseUrl}/${process.id}`,
        { isActive: !process.isActive },
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    },

    async deleteProcess(id: number): Promise<void> {
      await axiosInstance.delete(`${baseUrl}/${id}`);
    },
  };
}
