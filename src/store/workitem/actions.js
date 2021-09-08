import cred from "../cred.js";

export default {
    async updateWorkitem(_, payload) {
        let url = cred.getLinkType().url_workitem_update;
        // let url = "http://localhost:3100/workitem/update";
        //   console.log(payload);

        const response = await fetch(url, {
            method: "POST",
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer",
            enctype: "mutipart/form-data",
            body: JSON.stringify({
                workitem: payload,
            }),
        });
        const responseData = await response.json();

        if (!response.ok) {
            if (responseData.code === 409) {
                throw new Error(responseData.message);
            } else
                throw new Error(
                    "Request failed with error code: " +
                    response.status +
                    " Message error from server: " +
                    responseData.message
                );
        }
    },

    async getSprints(context) {
        let url = cred.getLinkType().url_sprint_get;

        // let url = "http://localhost:3100/workitem/getSprints";
        const response = await fetch(url, {
            method: "GET",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            enctype: "mutipart/form-data",
        });

        const responseData = await response.json();

        if (!response.ok) {
            if (responseData.code === 409) {
                throw new Error(responseData.message);
            } else
                throw new Error("Request failed with error code: " + response.status);
        }
        //  console.log(responseData)
        context.commit("setSprints", {
            sprintsObj: responseData,
        });
    },

    async insertSprint(_, payload) {
        //  let url = "http://localhost:3100/workitem/insertSprint";
        let url = cred.getLinkType().url_sprint_insert;

        //  console.log(payload)

        const response = await fetch(url, {
            method: "POST",
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer",
            enctype: "mutipart/form-data",
            body: JSON.stringify({
                sprint: payload,
            }),
        });

        const responseData = await response.json();

        if (!response.ok) {
            if (responseData.code === 409) {
                throw new Error(responseData.message);
            } else
                throw new Error("Work in progress..... Please submit all the fields ");
        }
    },

    async getWorkitems(context, payload) {
        let url = cred.getLinkType().url_workitem_get + "?sprint=" + payload.sprint;

        const response = await fetch(url, {
            method: "GET",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            enctype: "mutipart/form-data",
        });

        const responseData = await response.json();

        if (!response.ok) {
            if (responseData.code === 409) {
                throw new Error(responseData.message);
            } else
                throw new Error("Request failed with error code: " + response.status);
        }
        //  console.log(responseData)
        context.commit("setWorkitems", {
            workitemsObj: responseData,
        });
    },

    async insertWorkitem(_, payload) {
        let url = cred.getLinkType().url_wrkitem_insert;

        //   let url = "http://localhost:3100/workitem/insertWorkitem";

        //  console.log(payload)

        const response = await fetch(url, {
            method: "POST",
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer",
            enctype: "mutipart/form-data",
            body: JSON.stringify({
                workitem: payload,
            }),
        });

        const responseData = await response.json();

        if (!response.ok) {
            if (responseData.code === 409) {
                throw new Error(responseData.message);
            } else
                throw new Error("Work in progress..... Please submit all the fields ");
        }
    },

    async deleteWorkitem(_, payload) {
        let url = cred.getLinkType().url_workitem_delete;

        //   let url = "http://localhost:3100/workitem/deleteWorkitem";
        //  console.log(payload)

        const response = await fetch(url, {
            method: "DELETE",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            enctype: "mutipart/form-data",
            body: JSON.stringify({
                id: payload.id,
            }),
        });

        const responseData = await response.json();

        if (!response.ok) {
            if (responseData.code === 409) {
                throw new Error(responseData.message);
            } else
                throw new Error("Request failed with error code: " + response.status);
        }
    },
};