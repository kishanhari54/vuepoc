import { createPinia } from "pinia";
import { createApp } from "vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import App from "./App.vue";
import router from "./router";

const pinia = createPinia();

createApp(App).use(pinia).use(Toast).use(router).mount("#app");
