import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import store from "./store/index.js";

import { createApp } from "vue";
import App from "./App.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const app = createApp(App);
app.use(store);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");