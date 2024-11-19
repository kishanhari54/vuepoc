<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-progress-circular
        v-if="loading"
        model-value="20"
      ></v-progress-circular>

      <v-card-title>
        <span class="headline">Add Process</span>
      </v-card-title>

      <v-card-subtitle>
        <v-form v-model="formValid" ref="form">
          <div v-for="(field, index) in fields" :key="index" class="mb-4">
            <!-- Problem Field (Mandatory) -->
            <v-row>
              <v-col cols="12" md="4">
                <v-label>
                  <span>Problem</span>
                  <span class="text-danger"> *</span>
                  <!-- Asterisk for mandatory -->
                </v-label>
              </v-col>
              <v-col cols="12" md="8">
                <v-text-field
                  v-model="field.problem"
                  label="Problem"
                  required
                  :rules="[required]"
                />
              </v-col>
            </v-row>

            <!-- Description Field (Text Area) -->
            <v-row>
              <v-col cols="12" md="4">
                <v-label>Description</v-label>
              </v-col>
              <v-col cols="12" md="8">
                <v-textarea
                  v-model="field.description"
                  label="Description"
                  rows="3"
                  clearable
                />
              </v-col>
            </v-row>
          </div>

          <!-- Add More Button -->
          <v-btn @click="addMoreFields" color="primary" class="mt-3">
            Add More
          </v-btn>
        </v-form>
      </v-card-subtitle>

      <v-card-actions>
        <v-btn @click="closeDialog">Cancel</v-btn>
        <v-btn @click="submitForm" :disabled="!formValid" color="primary"
          >Save</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { required } from "@/common/forms/formValidations.js"; // Import validation rules
import {
  defineEmits,
  defineProps,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from "vue";
import { useToast } from "vue-toastification";
import axiosInstance from "../../../services/axiosInstance";
import { useMasterProcessStore } from "./store/masterprocess";

/*
// Define props (directly access it instead of destructuring)
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
}); */
// Define props to receive data from parent component
const props = defineProps({
  modelValue: Boolean,
  selectedPlant: Number,
  mode: String, // 'add' or 'edit'
  processId: Number, // Process ID for editing
});

const toast = useToast();
// Emit event to notify parent when dialog visibility changes
const emit = defineEmits(["update:modelValue"]);

const masterProcessStore = useMasterProcessStore();
const loading = ref(false);

// Reactive state for the form
const dialog = ref(false);
const formValid = ref(true);
const fields = ref([]); // Initial field

/*
// Watch the modelValue to reset form fields when dialog is opened
watch(props.modelValue, (newValue) => {
  if (newValue) {
    // Reset fields when dialog is opened
    fields.value = [{ problem: "", description: "" }];
    formValid.value = true; // Reset the form validity
  }
});
*/

// Watch for changes to the internal dialog state
watch(dialog, (newVal) => {
  //  emit("update:modelValue", newVal); // Update the parent when dialog state changes
  if (newVal) {
    fields.value = [{ problem: "", description: "" }];
  }
});

// Add more fields
const addMoreFields = () => {
  fields.value.push({ problem: "", description: "" });
};

// Close the dialog
const closeDialog = () => {
  emit("update:modelValue", false);
};

// Submit the form
const submitForm = async () => {
  // Process form submission

  let newProcess = fields.value.map((field, index) => {
    return {
      // id: Math.random() * 100, // You can generate a random id or get it from your backend
      sno: index + 1, // This is where you manage your process order (auto incremented)
      process: field.problem, // Assuming 'problem' field is the process name
      description: field.description, // Description field
      isActive: true, // Set the active status
      plantId: +masterProcessStore.selectedPlant.value || +props.selectedPlant, // Get the plant ID
    };
  });

  console.log(+masterProcessStore.selectedPlant.value);
  console.log(+props.selectedPlant);
  /* const newProcess = {
    id: Math.random() * 100,
    sNo: 1,
    plantId: masterProcessStore.selectedPlant.value || props.selectedPlant,
    process: fields.value.problem,
    description: fields.value.description,
    isActive: true,
  };*/
  loading.value = true;

  for (let i = 0; i < newProcess.length; i++) {
    if (props.mode == "edit") {
      let response = await axiosInstance.patch(
        "http://localhost:3000/processes/" + props.processId.id,
        {
          process: newProcess[i].problem, // Assuming 'problem' field is the process name
          description: newProcess[i].description, // Description field
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(`Problem ${response.data.process} Updated`);
    } else {
      let response = await axiosInstance.post(
        "http://localhost:3000/processes",
        newProcess[i],
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(`Problem ${response.data.process} Added`);
    }
  }
  emit("processUpdated", newProcess);
  loading.value = false;

  //console.log(response);
  closeDialog();
};

/*
// Show the dialog (you can trigger this from the parent)
// eslint-disable-next-line
const showDialog = () => {
  dialog.value = true;
};
*/
onUnmounted(() => {
  fields.value = [];
});

onMounted(() => {
  fields.value = [{ problem: "", description: "" }];
});

// Watch for changes in dialog visibility
watch(
  () => props.modelValue,
  (newValue) => {
    dialog.value = newValue;
    if (newValue && props.mode === "edit") {
      // If in edit mode, fetch the data for the process ID
      console.log(props);
      fetchProcessData(props.processId.id);
    }
  }
);

// Fetch the process data when in edit mode
const fetchProcessData = async (id) => {
  try {
    const response = await axiosInstance.get(
      `http://localhost:3000/processes/${id}`
    );
    fields.value = [
      {
        problem: response.data.process,
        description: response.data.description,
      },
    ];
  } catch (error) {
    console.error("Error fetching process data:", error);
  }
};
</script>

<style scoped></style>
