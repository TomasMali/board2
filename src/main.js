import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import store from "./store/index.js";

import { createApp, defineAsyncComponent } from "vue";
import App from "./App.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const BaseDialog = defineAsyncComponent(() =>
    import ("./components/BaseDialog.vue")
);

const app = createApp(App);
app.use(store);
app.component("base-dialog", BaseDialog);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");