import cred from "../cred.js";

export default {
    async getTodos_Action(context, payload) {
        let url = cred.getLinkType().url_todo_get + "?workitem=" + payload.workitem;

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
        context.commit("setTodos", {
            todosObj: responseData,
        });
    },

    async updateTodos_Action(_, payload) {
        let url = cred.getLinkType().url_todo_update;
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
                todo: payload,
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

    async insertTodos_Action(_, payload) {
        let url = cred.getLinkType().url_todo_insert;
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
                todo: payload,
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

    async deleteTodos_Action(_, payload) {
        let url = cred.getLinkType().url_todo_delete;
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