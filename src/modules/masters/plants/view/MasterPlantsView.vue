<template>
  <section class="page-header">
    <div class="page-title">Master Plants</div>
    <section class="page-actions">
      <SearchPlant @searchChanged="filterPlants"></SearchPlant>
      <AddPlant @addPlantButtonClicked="addNewPlantDialog()"></AddPlant>
    </section>
  </section>
  <section class="page-data">
    <PlantsList
      ref="plantsList"
      :tableSearch="tableSearch"
      @editPlant="editPlant"
    ></PlantsList>
  </section>

  <!-- <AddProcessPopup
    v-model="openDialogForm"
    :mode="mode"
    :processId="processId"
    @processUpdated="reloadProcessList"
  />-->
</template>
<script setup lang="ts">
import { dialogService } from "@/common/modules/DialogWrapper/dialogService";
import { ref } from "vue";
import AddPlant from "../components/AddPlant.vue";
import AddPlantPopup from "../components/AddPlantPopup.vue";
import PlantsList from "../components/PlantsList";
import SearchPlant from "../components/SearchPlant";

// Declare a reactive variable for selected plant
const tableSearch = ref("");

// New reactive variables for mode and processId
const plantsList = ref(null); // Correctly define ref

const filterPlants = (value) => {
  tableSearch.value = value;
};

/*
const addNewProcess = () => {
  mode.value = "add";
  //processId.value = value?.id;
  openDialogForm.value = true;
};

const editProcess = (id) => {
  mode.value = "edit"; // Set mode to edit
  processId.value = id; // Set the process ID
  openDialogForm.value = true;
};
*/

const editPlant = (id) => {
  dialogService.open({
    component: AddPlantPopup,
    metadata: {
      title: `Edit Plant`,
      data: {
        mode: "edit", // Set mode to edit
        plantId: id,
      },
    },
    width: 600,
    persistent: true,
    fullscreen: true,
    onClose: (result) => {
      console.log("Example dialog closed with result:", result);
      if (result && result.status == "success") {
        reloadList();
      }
    },
  });
};

const reloadList = async () => {
  if (plantsList.value) {
    await plantsList.value.fetchPlants(); // Reload data from the ProcessList component
  }
};

const addNewPlantDialog = () => {
  dialogService.open({
    component: AddPlantPopup,
    metadata: {
      title: "Example Dialog",
      data: {
        mode: "add",
      },
    },
    width: 600,
    persistent: true,
    onClose: (result) => {
      console.log("Example dialog closed with result:", result);
      if (result && result.status == "success") {
        reloadList();
      }
    },
  });
};
</script>
<style></style>
