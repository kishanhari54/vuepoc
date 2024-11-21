<script setup lang="ts">
import { dialogService } from "./dialogService";
</script>

<template>
  <v-dialog
    v-model="dialogService.isOpen.value"
    :width="dialogService.width.value"
    :persistent="dialogService.persistent.value"
    @click:outside="dialogService.close()"
  >
    <component
      v-if="dialogService.component.value"
      :is="dialogService.component.value"
      :metadata="dialogService.metadata.value"
      @close="dialogService.close(value)"
    />
  </v-dialog>
</template>
