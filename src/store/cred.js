export default {
    prod: {
        url_workitem_update: "https://tomasmali.it/boardapi/workitem/update",
        url_sprint_get: "https://tomasmali.it/boardapi/workitem/getSprints",
        url_sprint_insert: "https://tomasmali.it/boardapi/insertSprint",
        url_workitem_get: "https://tomasmali.it/boardapi/workitem/get",
        url_wrkitem_insert: "https://tomasmali.it/boardapi/workitem/insertWorkitem",
        url_workitem_delete: "https://tomasmali.it/boardapi/workitem/deleteWorkitem",
    },
    dev: {
        url_workitem_update: "http://localhost:3100/workitem/update",
        url_sprint_get: "http://localhost:3100/workitem/getSprints",
        url_sprint_insert: "http://localhost:3100/workitem/insertSprint",
        url_workitem_get: "http://localhost:3100/workitem/get",
        url_wrkitem_insert: "http://localhost:3100/workitem/insertWorkitem",
        url_workitem_delete: "http://localhost:3100/workitem/deleteWorkitem",
    },

    getLinkType() {
        return this.prod;
    },
};