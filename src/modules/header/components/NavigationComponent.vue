<template>
  <ul>
    <li>
      <router-link to="/dashboard"> Dashboard </router-link>
    </li>
    <li>
      <router-link to="/master/process">Master Process</router-link>
    </li>
  </ul>
</template>

<script setup></script>

<style scoped>
ul {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  gap: 10px;
}
</style>
