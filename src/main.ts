import { createPinia } from "pinia";
import { createApp } from "vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import App from "./App.vue";
import { useUserStore } from "./common/stores/userStore";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import router from "./router";

loadFonts();
const pinia = createPinia();

const app = createApp(App).use(router).use(vuetify).use(pinia);

app.use(Toast, {
  position: "top-right",
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false,
});

// Check for user in local storage on app startup
const storedUser = localStorage.getItem("user");
if (storedUser) {
  const userStore = useUserStore(pinia);
  userStore.user = JSON.parse(storedUser);
}

app.mount("#app");
