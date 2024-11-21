<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ metadata.title }}</span>
    </v-card-title>

    <v-card-subtitle>
      <v-form v-model="formValid" ref="form">
        <div v-for="(field, index) in fields" :key="index" class="mb-4">
          <!-- Problem Field (Mandatory) -->
          <v-row class="align-center">
            <v-col cols="12" md="2">
              <v-label>
                <span>Process</span>
                <span class="text-danger"> *</span>
                <!-- Asterisk for mandatory -->
              </v-label>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                variant="solo"
                hide-details="auto"
                v-model="field.process"
                placeholder="Enter"
                :rules="[required]"
              />
            </v-col>
          </v-row>

          <!-- Description Field (Text Area) -->
          <v-row>
            <v-col cols="12" md="2">
              <v-label>Description</v-label>
            </v-col>
            <v-col cols="12" md="10">
              <v-textarea
                hide-details
                variant="solo"
                v-model="field.description"
                placeholder="Enter"
                rows="3"
              />
            </v-col>
          </v-row>
        </div>

        <!-- Add More Button -->
        <v-btn @click="addMoreFields" class="primary mt-3" variant="outlined">
          Add More
        </v-btn>
      </v-form>
    </v-card-subtitle>

    <v-card-actions>
      <v-btn @click="handleCancel" variant="outlined" class="secondary"
        >Cancel</v-btn
      >
      <v-btn
        @click="submitForm"
        :disabled="!formValid"
        class="primary"
        variant="flat"
        >Save</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import axiosInstance from "@/common/axios/axiosinstance";
import Process from "@/common/interfaces/Process.interface.ts";
import { ToastService } from "@/common/services/ToastNotification.service";
import { required } from "@/common/util/formValidations"; // Import validation rules
import { defineEmits, defineProps, onMounted, onUnmounted, ref } from "vue";
//import { useToast } from "vue-toastification";
import { useProcessService } from "../services/Process.service";
import { useMasterProcessStore } from "../stores/useMasterProcessStore";

const processService = useProcessService();

// Define props to receive data from parent component
const props = defineProps<{
  metadata: {
    title: string;
    data: {
      mode: "add" | "edit";
      processId: string | undefined;
    };
  };
}>();

//const toast = useToast();
// Emit event to notify parent when dialog visibility changes
const emit = defineEmits<{
  //(e: "update:modelValue", value: boolean): void;
  (e: "processUpdated", processes: Process[]): void;
  (e: "close", result?: any): void;
}>();

const masterProcessStore = useMasterProcessStore();
const loading = ref<boolean>(false);

// Reactive state for the form
//const dialog = ref<boolean>(false);
const formValid = ref<boolean>(true);
const fields = ref<{ process: string; description: string }[]>([]); // Initial field

/*
  // Watch for changes to the internal dialog state
  watch(dialog, (newVal) => {
    if (newVal) {
      fields.value = [{ process: "", description: "" }];
    }
  });
  */
// Add more fields
const addMoreFields = (): void => {
  fields.value.push({ process: "", description: "" });
};

/*
// Close the dialog
const closeDialog = (data:any): void => {
  // emit("update:modelValue", false);
  emit("close",data);
}; */

const handleSave = (value: Process[]) => {
  // Return some data to the parent
  emit("close", {
    status: "success",
    data: value,
    action: "save",
  });
};

const handleCancel = () => {
  emit("close", {
    status: "cancelled",
    action: "cancel",
  });
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
      if (
        props.metadata.data.mode === "edit" &&
        props.metadata.data.processId
      ) {
        const updatedProcess = await processService.updateProcess(
          props.metadata.data.processId,
          {
            process: process.process,
            description: process.description,
          }
        );
        ToastService.success(`Process ${updatedProcess.process} Updated`);
      } else {
        const createdProcess = await processService.createProcess(process);
        ToastService.success(`Process ${createdProcess.process} Added`);
      }
    }

    handleSave(newProcess);
    emit("processUpdated", newProcess);
  } catch (error) {
    console.error("Error submitting process:", error);
  } finally {
    loading.value = false;
    //closeDialog();
  }
};

onUnmounted(() => {
  fields.value = [];
});

onMounted(() => {
  //fields.value = [{ process: "", description: "" }];
  loadOnEdit();
});

const loadOnEdit = () => {
  if (props.metadata.data.mode === "edit" && props.metadata.data.processId) {
    fetchProcessData(props.metadata.data.processId);
  }
};

/*
  // Watch for changes in dialog visibility
  watch(
    () => props.modelValue,
    (newValue) => {
      dialog.value = newValue;
      if (newValue && props.mode === "edit" && props.processId) {
        fetchProcessData(props.processId);
      }
    }
  ); */

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

<style scoped></style>
