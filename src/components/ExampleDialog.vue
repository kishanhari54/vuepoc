<script setup lang="ts">
import { defineEmits, defineProps, onMounted } from "vue";
defineProps<{
  metadata?: any;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

onMounted(() => {
  console.log("Mounted");
});
</script>

<template>
  <v-card>
    <v-card-title>
      Example Dialog
      <v-spacer></v-spacer>
      <v-btn icon="mdi-close" variant="text" @click="emit('close')"></v-btn>
    </v-card-title>
    <v-card-text>
      <div v-if="metadata">
        <p>Received metadata:</p>
        <pre>{{ JSON.stringify(metadata, null, 2) }}</pre>
      </div>
      <div v-else>No metadata provided</div>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="emit('close')">Close</v-btn>
    </v-card-actions>
  </v-card>
</template>
