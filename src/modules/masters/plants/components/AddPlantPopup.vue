<template>
  <v-card>
    <v-progress-circular v-if="loading" model-value="20"></v-progress-circular>

    <v-card-title>
      <span class="headline">Add Plant</span>
    </v-card-title>

    <v-card-subtitle>
      <v-form v-model="formValid" ref="form">
        <div v-for="(field, index) in fields" :key="index" class="mb-4">
          <!-- Problem Field (Mandatory) -->
          <v-row class="align-center">
            <v-col cols="12" md="2">
              <v-label>
                <span>Plant</span>
                <span class="text-danger"> *</span>
                <!-- Asterisk for mandatory -->
              </v-label>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                variant="solo"
                hide-details="auto"
                v-model="field.name"
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
import Plant from "@/common/interfaces/Plant.interface.ts";
import { required } from "@/common/util/formValidations"; // Import validation rules
import { usePlantService } from "../services/Plants.service";
import { ToastService } from "@/common/services/ToastNotification.service";
import { defineEmits, defineProps, onMounted, onUnmounted, ref } from "vue";
// Define props to receive data from parent component
const props = defineProps<{
  metadata: {
    title: string;
    data: {
      mode: "add" | "edit";
      plantId: string | undefined;
    };
  };
}>();

const plantsService = usePlantService();
const loading = ref<boolean>(false);
const formValid = ref<boolean>(true);
const fields = ref<{ name: string; description: string }[]>([]); // Initial field

const emit = defineEmits<{
  (e: "close", result?: any): void;
}>();

// Add more fields
const addMoreFields = (): void => {
  fields.value.push({ name: "", description: "" });
};

const handleSave = (value: Plant[]) => {
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
  const data: Plant[] = fields.value.map((field) => {
    return {
      name: field.name, // Assuming 'problem' field is the process name
      description: field.description, // Description field
    };
  });

  loading.value = true;

  try {
    for (const plant of data) {
      if (props.metadata.data.mode === "edit" && props.metadata.data.plantId) {
        const updatedPlant = await plantsService.updatePlant(
          props.metadata.data.plantId,
          {
            name: plant.name,
            description: plant.description,
          }
        );
        ToastService.success(`Plant ${updatedPlant.name} Updated`);
      } else {
        const createdPlant = await plantsService.createPlant(plant);
        ToastService.success(`Process ${createdPlant.name} Added`);
      }
    }

    handleSave(data);
  } catch (error) {
    console.error("Error submitting plant:", error);
  } finally {
    loading.value = false;
  }
};

const fetchPlantData = async (id: string | null): Promise<void> => {
  try {
    const response = await plantsService.getPlants(id);
    debugger;
    fields.value = [
      {
        name: response[0].name,
        description: response[0].description,
      },
    ];
  } catch (error) {
    console.error("Error fetching process data:", error);
  }
};

onUnmounted(() => {
  fields.value = [];
});

onMounted(() => {
  addMoreFields();
  loadOnEdit();
});

const loadOnEdit = () => {
  debugger;
  if (props.metadata.data.mode === "edit" && props.metadata.data.plantId) {
    debugger;
    fetchPlantData(props.metadata.data.plantId);
  }
};
</script>
