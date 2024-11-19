<template>
  <!-- <hello-world />-->
  <HeaderView></HeaderView>
  <section class="route-content">
    <router-view></router-view>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
//import HelloWorld from "../components/HelloWorld.vue";
import HeaderView from "@/modules/header/view/HeaderView.vue";

export default defineComponent({
  name: "HomeView",

  components: {
    HeaderView,
    //  HelloWorld,
  },
});
</script>

<style scoped>
.route-content {
  padding: 30px;
}
</style>
