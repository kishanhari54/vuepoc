<template>
  <v-btn @click="addPlant" variant="flat" class="primary">Add Plant</v-btn>
</template>

<script lang="ts" setup>
import { defineEmits } from "vue";

const emit = defineEmits<{
  (event: "addPlantButtonClicked", value: boolean): void;
}>();

// Emit event for add process button click
const addPlant = (): void => {
  emit("addPlantButtonClicked", true);
};
</script>
