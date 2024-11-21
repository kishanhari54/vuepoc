import axiosInstance from "@/common/axios/axiosinstance";
import { Plant } from "@/common/interfaces/Plant.interface";

// Create a composable for Plant functionality
export function usePlantService() {
  const baseUrl = "http://localhost:3000/plants";

  return {
    async createPlant(Plant: Plant): Promise<Plant> {
      const response = await axiosInstance.post(baseUrl, Plant, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    },

    async updatePlant(id: string, data: Partial<Plant>): Promise<Plant> {
      const response = await axiosInstance.patch(`${baseUrl}/${id}`, data, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    },

    async getPlants(plantId: number | null = null): Promise<Plant[]> {
      const url = plantId ? `${baseUrl}?id=${plantId}` : baseUrl;
      const response = await axiosInstance.get(url);
      return response.data;
    },

    async deletePlant(id: number): Promise<void> {
      await axiosInstance.delete(`${baseUrl}/${id}`);
    },
  };
}
