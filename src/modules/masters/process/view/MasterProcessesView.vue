<template>
  <section class="page-header">
    <div class="page-title">Master Process</div>
    <section class="page-actions">
      <SearchProcess @searchChanged="searchProcess"></SearchProcess>
      <UploadList></UploadList>
      <DownloadList></DownloadList>

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
  <!--<AddProcessRightPopup
    v-model="openDialogForm"
    :mode="mode"
    :processId="processId"
    @processUpdated="reloadProcessList"
  >
  </AddProcessRightPopup>-->
  <AddProcessPopup
    v-model="openDialogForm"
    :mode="mode"
    :processId="processId"
    @processUpdated="reloadProcessList"
  />
</template>
<script setup lang="ts">
import { ref } from "vue";
import AddProcess from "../components/AddProcess";
import AddProcessPopup from "../components/AddProcessPopup";
import DownloadList from "../components/DownloadList";
import ProcessList from "../components/ProcessList";
import SearchProcess from "../components/SearchProcess";
import SelectPlant from "../components/SelectPlant";
import UploadList from "../components/UploadList";

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
