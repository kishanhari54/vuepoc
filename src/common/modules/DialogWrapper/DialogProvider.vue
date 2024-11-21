<script setup lang="ts">
import { dialogService } from "./dialogService";

// Handle the close event and pass the data to the dialog service
const handleClose = (result: any) => {
  dialogService.close(result); // Pass the result to the dialog service
};
</script>

<template>
  <v-dialog
    :scrim="true"
    scrollable
    :fullscreen="dialogService.fullscreen.value"
    transition="dialog-right-transition"
    v-model="dialogService.isOpen.value"
    :width="dialogService.width.value"
    :persistent="dialogService.persistent.value"
    @click:outside="dialogService.close()"
  >
    <component
      v-if="dialogService.component.value"
      :is="dialogService.component.value"
      :metadata="dialogService.metadata.value"
      @close="handleClose"
    />
  </v-dialog>
</template>
