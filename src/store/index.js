import { createStore } from "vuex";

import workitem from "./workitem/index.js";
import todo from "./todo/index.js";

//import requestModule from

const store = createStore({
    modules: {
        workitem: workitem,
        todo: todo,
    },
});

export default store;