<template>
  <section class="page-header">
    <div class="page-title">Master Plants</div>
    <section class="page-actions">
      <SearchPlant @searchChanged="searchProcess"></SearchPlant>
      <AddPlant @addPlantButtonClicked="addNewPlantDialog()"></AddPlant>
    </section>
  </section>
  <section class="page-data">
    <PlantsList
      ref="plantsLista"
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

const searchPlant = (value) => {
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
      debugger;
      console.log("Example dialog closed with result:", result);
      if (result && result.status == "success") {
        reloadList();
      }
    },
  });
};
</script>
<style>
.page-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  display: flex;
  align-items: center;

  .page-title {
    font-family: Open Sans;
    font-size: 24px;
    font-weight: 700;
    line-height: 32.68px;
    letter-spacing: 0.04em;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
  }
  margin-bottom: 14px;
}

.page-data {
  .option {
    border: 1px solid #d2d2d2;
    padding: 30px;
    margin-bottom: 20px;
  }
}

.page-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}
</style>
