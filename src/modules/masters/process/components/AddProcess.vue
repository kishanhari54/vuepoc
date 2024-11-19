<template>
  <v-btn @click="openDialog" density="default" size="large">Add Process</v-btn>

  <!-- AddProcessPopup component is commented out but can be used as shown below -->
  <!--
  <AddProcessPopup
    v-model="openDialogForm"
    :selectedPlant="props.selectedPlant"
  />
  -->
</template>

<script lang="ts" setup>
import { defineEmits } from "vue";

/*
// Type for the props (you can define this type according to the actual data structure of selectedPlant)
interface Props {
  selectedPlant: number; // Assuming selectedPlant is a plant ID (number)
}

// Define props and types for this component
const props = defineProps<Props>();
*/
// Emit event for add process button click
const emit = defineEmits<{
  (event: "addProcessButtonClicked", value: boolean): void;
}>();

// Local reactive state for the dialog visibility
///const openDialogForm = ref<boolean>(false);

// Method to open the dialog and emit event
const openDialog = (): void => {
  ///openDialogForm.value = true;
  emit("addProcessButtonClicked", true);
};
</script>
