<template>
  <div class="d-flex align-center justify-space-between pa-4 pagination">
    <div class="d-flex flex-column">
      <div class="d-flex ga-2 align-center">
        <v-label>Items Per Page</v-label>
        <v-select
          v-model="localItemsPerPage"
          :items="itemsPerPageOptions"
          variant="solo"
          density="compact"
          class="items-per-page-select"
          hide-details
        />
      </div>
      <div><v-label>Total Items : </v-label>{{ totalItemsLength }}</div>
    </div>

    <v-pagination
      v-model="localCurrentPage"
      :length="Math.ceil(totalItemsLength / localItemsPerPage)"
      :total-visible="7"
      class="custom-pagination"
      @update:model-value="handlePageChange"
    >
      <template v-slot:prev="{ props }">
        <v-btn
          variant="text"
          v-bind="props"
          :disabled="localCurrentPage === 1"
          class="text-none px-2"
          size="small"
          @click="handlePageChange(localCurrentPage - 1)"
        >
          Previous
        </v-btn>
      </template>

      <template v-slot:next="{ props }">
        <v-btn
          variant="text"
          v-bind="props"
          :disabled="
            localCurrentPage === Math.ceil(totalItemsLength / localItemsPerPage)
          "
          class="text-none px-2"
          size="small"
          @click="handlePageChange(localCurrentPage + 1)"
        >
          Next
        </v-btn>
      </template>
    </v-pagination>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref, watch } from "vue";
/*
// Define types for props
interface PaginationProps {
  currentPage: number;
  itemsPerPage: number;
  totalItemsLength: number;
  itemsPerPageOptions: number[]; // Corrected type for array
} */

// Props passed from the parent component
const props = defineProps({
  currentPage: {
    type: Number,
    default: 1,
  },
  itemsPerPage: {
    type: Number,
    default: 10,
  },
  totalItemsLength: {
    type: Number,
    required: true,
  },
  itemsPerPageOptions: {
    type: Array, // This properly types it as a number array
    default: () => [5, 10, 15, 20, 25],
  },
});
// Emit the page and itemsPerPage values back to the parent component
const emit = defineEmits<{
  (e: "update:currentPage", newPage: number): void;
  (e: "update:itemsPerPage", newItemsPerPage: number): void;
}>();

// Local reactive states
const localCurrentPage = ref<number>(props.currentPage); // Local state for currentPage
const localItemsPerPage = ref<number>(props.itemsPerPage); // Local state for itemsPerPage

// Emit changes when page is changed
const handlePageChange = (newPage: number): void => {
  emit("update:currentPage", newPage);
  localCurrentPage.value = newPage;
};

// Watch for changes in localItemsPerPage and emit to parent
watch(localItemsPerPage, (newValue: number) => {
  emit("update:itemsPerPage", newValue);
});

/*
// Change page function for custom Next/Previous buttons
const changePage = (newPage: number): void => {
  // Ensure newPage is within valid range
  const totalPages = Math.ceil(props.totalItemsLength / localItemsPerPage.value);
  if (newPage >= 1 && newPage <= totalPages) {
    localCurrentPage.value = newPage;
    console.log(localCurrentPage.value);
    emit("update:currentPage", newPage);
  }
}; */
</script>

<style>
.pagination {
  height: 100%;
  font-family: Open Sans;
  font-size: 14px;
  font-weight: 400;
  line-height: 19.07px;
  text-align: left;

  color: #b4b4b4;
}
.v-pagination__item--is-active {
  background-color: black;
  color: white;
}
</style>
