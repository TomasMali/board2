export default {
    setWorkitems(state, payload) {
        state.workitems = payload.workitemsObj;
    },
    setSprints(state, payload) {
        state.sprints = payload.sprintsObj;
    },
};