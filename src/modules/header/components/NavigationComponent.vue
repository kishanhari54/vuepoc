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

  a {
    text-decoration: none; /* Remove underline */
    color: inherit; /* Inherit text color from parent */
    font-weight: normal; /* Reset any bold styling */
    color: #5a5a5a;

    /* Styling for active links */ /* Use the default Vue Router classes to make active links bold */
    &.router-link-active {
      font-weight: bold;

      color: #000000;
    }

    /* Optional: You can also apply styles when it's an exact match */
    &.router-link-exact-active {
      font-weight: bold;
      color: #000000; /* You can also change the color */
    }
  }
}
</style>
