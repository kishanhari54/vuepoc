import { createPinia } from "pinia";
import { createApp } from "vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import router from "./router";

loadFonts();
const pinia = createPinia();

createApp(App).use(router).use(vuetify).use(pinia).use(Toast).mount("#app");
