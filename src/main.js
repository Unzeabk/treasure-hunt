import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import "./style.css";
import '@/misc/register-service-worker'
import 'pwacompat'

createApp(App).use(store).mount("#app");
