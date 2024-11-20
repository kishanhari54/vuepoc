<template>
  <ul>
    <li>
      <router-link to="/dashboard"> Dashboard </router-link>
    </li>
    <li>
      Master Process
      <v-menu activator="parent">
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            :value="index"
          >
            <router-link :to="item.route">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </router-link>
          </v-list-item>
        </v-list>
      </v-menu>
    </li>
  </ul>
</template>

<script setup>
const items = [
  {
    title: "Process",
    route: "master/process",
  },
  {
    title: "Login",
    route: "/login",
  },
];
</script>

<style scoped>
ul {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  gap: 10px;
  font-family: Open Sans;
  font-size: 20px;
  font-weight: 600;
  line-height: 27.24px;

  text-align: center;

  li {
    cursor: pointer;
    color: #5a5a5a;
    padding: 10px 14px;
    a {
      text-decoration: none; /* Remove underline */
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
}
</style>
