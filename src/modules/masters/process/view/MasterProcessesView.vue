<template>
  <section class="page-header">
    <div class="page-title">Master Process</div>
    <section class="page-actions">
      <SearchProcess @searchProcess="searchProcess"></SearchProcess>
      <DownloadList></DownloadList>
      <UploadList></UploadList>
      <AddProcess @addProcessButtonClicked="addNewProcess()"></AddProcess>
    </section>
  </section>
  <section class="page-data">
    <section class="option">
      <SelectPlant @plantSelected="onPlantSelected"></SelectPlant>
    </section>
    <ProcessList
      ref="processList"
      :selectedPlant="selectedPlant"
      :tableSearch="tableSearch"
      @editProcess="editProcess"
    ></ProcessList>
  </section>

  <AddProcessPopup
    v-model="openDialogForm"
    :mode="mode"
    :processId="processId"
    @processUpdated="reloadProcessList"
  />
</template>
<script setup lang="ts">
import { ref } from "vue";
import SearchProcess from "../components/SearchProcess";
import ProcessList from "../components/ProcessList";
import SelectPlant from "../components/SelectPlant";
import AddProcess from "../components/AddProcess";
import UploadList from "../components/UploadList";
import DownloadList from "../components/DownloadList";
import AddProcessPopup from "../components/AddProcessPopup";

// Declare a reactive variable for selected plant
const selectedPlant = ref(null);
const tableSearch = ref("");
let openDialogForm = ref(false);

// New reactive variables for mode and processId
const mode = ref("add"); // default to 'add'
const processId = ref(null); // To store the ID for editing
const processList = ref(null); // Correctly define ref

// Handle the plant selection
const onPlantSelected = (plantId) => {
  selectedPlant.value = plantId; // Set the selected plant's ID
};

const searchProcess = (value) => {
  tableSearch.value = value;
};

const addNewProcess = () => {
  mode.value = "add";
  //processId.value = value?.id ;
  openDialogForm.value = true;
};

const reloadProcessList = async () => {
  if (processList.value) {
    await processList.value.fetchProcesses(selectedPlant.value); // Reload data from the ProcessList component
  }
  openDialogForm.value = false; // Close the modal
};

const editProcess = (id) => {
  mode.value = "edit"; // Set mode to edit
  processId.value = id; // Set the process ID
  openDialogForm.value = true;
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
}

.page-actions {
  display: flex;
  gap: 10px;
}
</style>
