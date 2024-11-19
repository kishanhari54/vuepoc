<template>
  <v-data-table
    sticky-header
    :headers="headers"
    :items="filteredItems"
    item-value="id"
    :loading="loading"
    :search="searchQuery"
    :items-length="totalItems"
    v-model:items-per-page="itemsPerPage"
    v-model:page="page"
  >
    <!-- Loading state for the table -->
    <template v-slot:loading>
      <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
    </template>

    <template v-slot:item="{ item, index }">
      <tr>
        <td>{{ index + 1 }}</td>
        <td>{{ item.process }}</td>
        <td>{{ item.description }}</td>
        <td class="action-buttons">
          <!-- Action buttons with icons -->
          <v-btn icon @click="editProcess(item)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon @click="deleteProcess(item.id)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          <v-btn icon @click="toggleActiveStatus(item)">
            <v-icon>{{
              item.isActive ? "mdi-toggle-switch" : "mdi-toggle-switch-off"
            }}</v-icon>
          </v-btn>
        </td>
      </tr>
    </template>
    <template v-slot:bottom>
      <VuePagination
        :currentPage="page"
        :itemsPerPage="itemsPerPage"
        :totalItems="totalItems"
        @update:currentPage="handlePageChange"
        @update:itemsPerPage="updateItemsPerPage"
      />
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import axios from "axios";
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

import Process from "@/common/interfaces/Process.interface.ts";
interface Props {
  selectedPlant: number | null;
  tableSearch: string;
}

// Props passed from the parent component
const props = defineProps<Props>();

// Emit the page and itemsPerPage values back to the parent component
const emit = defineEmits<{
  (e: "editProcess", id: number): void;
}>();

// Reactive states
const loading = ref<boolean>(true); // Loading state
const processes = ref<Process[]>([]); // List of processes
const searchQuery = ref<string>(""); // Search query
const page = ref<number>(1); // Current page
const itemsPerPage = ref<number>(10); // Items per page

// Event handlers
const handlePageChange = (newPage: number): void => {
  loading.value = true;
  page.value = newPage;
  setTimeout(() => {
    loading.value = false;
  }, 200);
};

const updateItemsPerPage = (newItemsPerPage: number): void => {
  itemsPerPage.value = newItemsPerPage;
};

const headers = [
  { title: "S No", key: "itemId" },
  { title: "Process", key: "processName" },
  { title: "Description", key: "description" },
  { title: "Actions", key: "actions" },
];

// Computed properties
const filteredItems = computed<Process[]>(() => {
  return processes.value.filter((item) => {
    return (
      item.description &&
      item.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
});

const totalItems = computed<number>(() => filteredItems.value.length);

// Fetch processes from API
const fetchProcesses = async (plantId: number | null) => {
  let url = "http://localhost:3000/processes";
  if (plantId) {
    url = `${url}?plantId=${plantId}`;
  }

  try {
    const response = await axios.get(url);
    processes.value = response.data; // Store the data in the processes array
    loading.value = false; // Set loading to false once data is loaded
  } catch (error) {
    console.error("Error fetching processes:", error);
    loading.value = false;
  }
};

// Toggle active/inactive status function
const toggleActiveStatus = async (process: Process): Promise<void> => {
  const newStatus = !process.isActive;
  try {
    const url = `http://localhost:3000/processes/${process.id}`;
    const response = await axios.patch(url, {
      isActive: newStatus,
    });
    process.isActive = response.data.isActive;
    console.log("Status updated successfully:", response.data);
  } catch (error) {
    console.error("Error updating status:", error);
  }
};

// Edit process function
const editProcess = (process: Process): void => {
  emit("editProcess", process.id); // Emit the event with the process ID
};

// Delete process function
const deleteProcess = (id: number): void => {
  console.log("Deleting process with ID:", id);
  const index = processes.value.findIndex((process) => process.id === id);
  if (index !== -1) {
    processes.value.splice(index, 1); // Remove from the list
  }
};

onMounted(() => {
  fetchProcesses(props.selectedPlant);
});

// Watch for changes in selectedPlant and refetch processes
watch(
  () => props.selectedPlant,
  (newPlantId) => {
    fetchProcesses(newPlantId);
  },
  { immediate: false } // Trigger fetchProcesses immediately when component mounts
);

// Watch for changes in tableSearch prop
watch(
  () => props.tableSearch,
  (newSearchQuery) => {
    searchQuery.value = newSearchQuery;
  }
);

// Expose methods for parent component
defineExpose({
  fetchProcesses,
});
</script>
