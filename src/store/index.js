import { createStore } from "vuex";

import workitem from "./workitem/index.js";

//import requestModule from

const store = createStore({
    modules: {
        workitem: workitem,
    },
});

export default store;