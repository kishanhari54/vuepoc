<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    :scrim="false"
    transition="dialog-right-transition"
  >
    <div class="dialog-layout">
      <v-progress-circular
        v-if="loading"
        indeterminate
        color="primary"
        class="loading-spinner"
      ></v-progress-circular>

      <!-- Left overlay -->
      <div class="overlay" @click="dialog = false"></div>

      <!-- Right content -->
      <v-card class="dialog-content d-flex flex-column">
        <!-- Header -->
        <v-toolbar dark color="primary" class="flex-grow-0">
          <v-toolbar-title>Add Process</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <!-- Content -->
        <v-card-text class="flex-grow-1 overflow-y-auto">
          <v-form v-model="formValid" class="h-100">
            <div v-for="(field, index) in fields" :key="index" class="mb-4">
              <!-- Process Field -->
              <v-row>
                <v-col cols="12" md="4">
                  <v-label>
                    <span>Process</span>
                    <span class="text-danger">*</span>
                  </v-label>
                </v-col>
                <v-col cols="12" md="8">
                  <v-text-field
                    v-model="field.process"
                    label="Process"
                    :rules="[required]"
                    hide-details="auto"
                  />
                </v-col>
              </v-row>

              <!-- Description Field -->
              <v-row>
                <v-col cols="12" md="4">
                  <v-label>Description</v-label>
                </v-col>
                <v-col cols="12" md="8">
                  <v-textarea
                    v-model="field.description"
                    label="Description"
                    rows="3"
                    hide-details="auto"
                  />
                </v-col>
              </v-row>
            </div>

            <v-btn @click="addMoreFields" color="primary" class="mt-3">
              Add More
            </v-btn>
          </v-form>
        </v-card-text>

        <!-- Actions -->
        <v-divider></v-divider>
        <v-card-actions class="flex-grow-0 pa-4">
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="closeDialog">Cancel</v-btn>
          <v-btn
            color="primary"
            @click="submitForm"
            :disabled="!formValid"
            :loading="loading"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-dialog>
</template>

<style scoped>
.dialog-layout {
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
}

.loading-spinner {
  position: absolute;
  top: 50%;
  left: 65%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}

.overlay {
  width: 30%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  cursor: pointer;
}

.dialog-content {
  width: 70%;
  height: 100%;
  border-radius: 0;
  display: flex;
  flex-direction: column;
}

:deep(.v-overlay__scrim) {
  opacity: 0 !important;
}

:deep(.v-dialog) {
  background: transparent !important;
  box-shadow: none;
}

:deep(.v-card-text) {
  padding: 24px;
}
</style>

<script setup lang="ts">
import axiosInstance from "@/common/axios/axiosinstance";
import Process from "@/common/interfaces/Process.interface.ts";
import { required } from "@/common/util/formValidations"; // Import validation rules
import {
  defineEmits,
  defineProps,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from "vue";
import { useToast } from "vue-toastification";
import { useMasterProcessStore } from "../stores/useMasterProcessStore";

// Define props to receive data from parent component
const props = defineProps<{
  modelValue: boolean;
  //selectedPlant: number;
  mode: "add" | "edit"; // 'add' or 'edit'
  processId: string | null; // Process ID for editing
}>();

const toast = useToast();
// Emit event to notify parent when dialog visibility changes
const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "processUpdated", processes: Process[]): void;
}>();

const masterProcessStore = useMasterProcessStore();
const loading = ref<boolean>(false);

// Reactive state for the form
const dialog = ref<boolean>(false);
const formValid = ref<boolean>(true);
const fields = ref<{ process: string; description: string }[]>([]); // Initial field

// Watch for changes to the internal dialog state
watch(dialog, (newVal) => {
  if (newVal) {
    fields.value = [{ process: "", description: "" }];
  }
});

// Add more fields
const addMoreFields = (): void => {
  fields.value.push({ process: "", description: "" });
};

// Close the dialog
const closeDialog = (): void => {
  emit("update:modelValue", false);
};

// Submit the form
const submitForm = async (): Promise<void> => {
  if (!masterProcessStore.selectedPlant) {
    alert("Select a Plant");
    return;
  }

  const newProcess: Process[] = fields.value.map((field) => {
    return {
      process: field.process, // Assuming 'problem' field is the process name
      description: field.description, // Description field
      isActive: true, // Set the active status
      plantId: +masterProcessStore.selectedPlant, // Get the plant ID
    };
  });

  loading.value = true;

  try {
    for (const process of newProcess) {
      if (props.mode === "edit") {
        const response = await axiosInstance.patch(
          `http://localhost:3000/processes/${props.processId}`,
          {
            process: process.process,
            description: process.description,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        toast.success(`Process ${response.data.process} Updated`);
      } else {
        const response = await axiosInstance.post(
          "http://localhost:3000/processes",
          process,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        toast.success(`Process ${response.data.process} Added`);
      }
    }

    emit("processUpdated", newProcess);
  } catch (error) {
    console.error("Error submitting process:", error);
  } finally {
    loading.value = false;
    closeDialog();
  }
};

onUnmounted(() => {
  fields.value = [];
});

onMounted(() => {
  fields.value = [{ process: "", description: "" }];
});

// Watch for changes in dialog visibility
watch(
  () => props.modelValue,
  (newValue) => {
    dialog.value = newValue;
    if (newValue && props.mode === "edit" && props.processId) {
      fetchProcessData(props.processId);
    }
  }
);

// Fetch the process data when in edit mode
const fetchProcessData = async (id: string | null): Promise<void> => {
  try {
    const response = await axiosInstance.get(
      `http://localhost:3000/processes/${id}`
    );
    fields.value = [
      {
        process: response.data.process,
        description: response.data.description,
      },
    ];
  } catch (error) {
    console.error("Error fetching process data:", error);
  }
};
</script>
