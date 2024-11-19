import { Plant } from "@/common/interfaces/Plant.interface";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useMasterProcessStore = defineStore(
  "useMasterProcessStore",
  () => {
    // Store reactive state for the selected plant, typed as a Plant or null
    const selectedPlant = ref<Plant | null>(null);

    // Define the method to update the selected plant with proper typing
    const setPlant = (value: Plant | null): void => {
      selectedPlant.value = value;
      //   console.log("set selected plant " + (value ? value.name : "null"));
    };

    return {
      selectedPlant,
      setPlant, // Make sure setPlant is returned to be used externally
    };
  }
);
