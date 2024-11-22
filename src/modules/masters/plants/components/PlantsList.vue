<template>
  <v-data-table
    sticky-header
    :headers="headers"
    :items="filteredItems"
    item-value="id"
    :loading="loading"
    :search="searchQuery"
    :items-length="filteredItems.length"
    v-model:items-per-page="itemsPerPage"
    v-model:page="page"
  >
    <!-- Loading state for the table -->
    <template v-slot:loading>
      <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
    </template>

    <template v-slot:item="{ item }">
      <tr>
        <td class="w-auto">
          <v-icon icon="custom:RearrangeIcon" rounded="0"></v-icon>
        </td>
        <td class="bold">{{ item.name }}</td>
        <td>{{ item.description }}</td>
        <td class="action-buttons">
          <!-- Action buttons with icons -->
          <v-btn variant="text" icon @click="editProcess(item)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn variant="text" icon @click="deleteProcess(item.id)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </td>
      </tr>
    </template>
    <template v-slot:bottom>
      <VuePagination
        :totalItemsLength="filteredItems.length"
        @update:currentPage="page = $event"
        @update:itemsPerPage="itemsPerPage = $event"
      />
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import Plant from "@/common/interfaces/Plant.interface.ts";
import { ToastService } from "@/common/services/ToastNotification.service";
import {
  computed,
  defineEmits,
  defineExpose,
  defineProps,
  onMounted,
  ref,
  watch,
} from "vue";
import VuePagination from "../../../../common/modules/pagination/VuePagination.vue";
import { usePlantService } from "../services/Plants.service";
interface Props {
  tableSearch: string;
}

// Props passed from the parent component
const props = defineProps<Props>();

const plantService = usePlantService();

// Emit the page and itemsPerPage values back to the parent component
const emit = defineEmits<{
  (e: "editPlant", id: number): void;
}>();

// Reactive states
const loading = ref<boolean>(true); // Loading state
const plants = ref<Plant[]>([]); // List of processes
const searchQuery = ref<string>(""); // Search query
const page = ref<number>(1); // Current page
const itemsPerPage = ref<number>(10); // Items per page

const headers = [
  { title: "", key: "" },
  { title: "Plant Name", key: "name" },
  { title: "Description", key: "description" },
  { title: "Actions", key: "actions" },
];

// Computed properties
const filteredItems = computed<Plant[]>(() => {
  return plants.value.filter((item) => {
    return (
      item.description &&
      item.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
});

// Fetch fetchPlants from API
const fetchPlants = async (plantId: number | null) => {
  loading.value = true;
  try {
    plants.value = await plantService.getPlants(plantId);
    ToastService.success("Plants loaded successfully");
  } catch (error) {
    ToastService.error("Failed to load plants");
  } finally {
    loading.value = false;
  }
};

// Edit process function
const editProcess = (plant: Plant): void => {
  emit("editPlant", plant.id); // Emit the event with the process ID
};

// Delete process function
const deleteProcess = async (id: number): Promise<void> => {
  try {
    await plantService.deletePlant(id);
    plants.value = plants.value.filter((process) => process.id !== id);
    ToastService.success("Plant deleted successfully");
  } catch (error) {
    ToastService.error("Failed to delete Plant");
  }
};

onMounted(() => {
  fetchPlants(null);
});

// Watch for changes in tableSearch prop
watch(
  () => props.tableSearch,
  (newSearchQuery) => {
    searchQuery.value = newSearchQuery;
  }
);

// Expose methods for parent component
defineExpose({
  fetchPlants,
});
</script>
