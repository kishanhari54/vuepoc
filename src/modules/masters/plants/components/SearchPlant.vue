<template>
  <div class="search-field">
    <v-text-field
      v-model="searchQuery"
      prepend-inner-icon="mdi-magnify"
      placeholder="Search"
      hide-details
      variant="solo"
      density="compact"
      single-line
    ></v-text-field>
  </div>
</template>

<script lang="ts" setup>
import { watchDebounced } from "@vueuse/core";
import { defineEmits, ref } from "vue";
// Reactive variable to hold the search query
const searchQuery = ref<string>("");

// Define the event to emit the search query to the parent
const emit = defineEmits<{
  (e: "searchChanged", searchQuery: string): void;
}>();

watchDebounced(
  searchQuery,
  (value: string) => {
    console.log(value);
    emit("searchChanged", value);
  },
  { debounce: 500, maxWait: 1000 }
);
</script>

<style scoped></style>
