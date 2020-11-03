import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueI18n from 'vue-i18n'

createApp(App)
    .use(store)
    .use(VueI18n)
    .use(router)
    .mount("#app");

