<template>
  <div class="section">
    <v-row>
      <v-col cols="3">
        <div class="field-box">
          <!-- Label for the Dropdown -->
          <div class="label">Select Plant:</div>

          <!-- v-select to dynamically populate with plant data -->
          <v-select
            label="Select a Plant"
            v-model="selectedPlant"
            :items="plants"
            item-title="name"
            item-value="id"
            variant="solo-filled"
            dense
            clearable
            outlined
            :loading="loading"
            @update:model-value="onPlantSelected"
          ></v-select>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts" setup>
import axiosInstance from "@/common/axios/axiosinstance"; // Adjust the import path as needed
import { Plant } from "@/common/interfaces/Plant.interface";
import { defineEmits, onMounted, ref } from "vue";
import { useMasterProcessStore } from "../stores/useMasterProcessStore";
const masterProcessStore = useMasterProcessStore(); // Use the Pinia store

// Declare reactive variables with explicit types
const plants = ref<Plant[]>([]); // List of plants fetched from API
const loading = ref<boolean>(true); // Loading state
const selectedPlant = ref<Plant | null>(null); // The selected plant, which can be null initially

// Define the event emission function with proper typing
const emit = defineEmits<{
  (event: "plantSelected", value: Plant | null): void;
}>();

// Function to emit the selected plant to the parent when it changes
const onPlantSelected = (value: Plant | null): void => {
  // Emit an event with the selected plant value
  emit("plantSelected", value);
  console.log(masterProcessStore);
  // Update Pinia store
  if (value) {
    masterProcessStore.setPlant(value); // Access `setPlant` method directly from the store
  }
};

// Fetch the plant list from the API
const fetchPlants = async (): Promise<void> => {
  try {
    const response = await axiosInstance.get<Plant[]>(
      "http://localhost:3000/plants"
    );
    plants.value = response.data; // Store the plants fetched from the API
    loading.value = false;
  } catch (error) {
    loading.value = false;
    console.error("Error fetching plants:", error);
  }
};

// Fetch plants when the component is mounted
onMounted(fetchPlants);
</script>

<style scoped>
/*
.section {
  border: 1px solid var(--S-Grey-4, #d2d2d2);
  padding: 10px 30px;
} */
</style>
