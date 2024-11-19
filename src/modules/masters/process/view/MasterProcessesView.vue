<template>
  <section class="page-header">
    <div class="page-title">Master Process</div>
    <section class="page-actions">
      <SearchProcess></SearchProcess>
      <DownloadList></DownloadList>
      <UploadList></UploadList>
      <AddProcess></AddProcess>
    </section>
  </section>
  <section class="page-data">
    <section class="option">
      <SelectPlant></SelectPlant>
    </section>
    <ProcessList></ProcessList>
  </section>
</template>
<script setup lang="ts">
import SearchProcess from "../components/SearchProcess";
import ProcessList from "../components/ProcessList";
import SelectPlant from "../components/SelectPlant";
import AddProcess from "../components/AddProcess";
import UploadList from "../components/UploadList";
import DownloadList from "../components/DownloadList";
</script>
<style>
.page-header {
  display: flex;
  justify-content: space-between;
}

.page-actions {
  display: flex;
  gap: 10px;
}
</style>
