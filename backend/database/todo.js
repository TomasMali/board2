const pool = require("./connection");
const express = require("express");
const router = express.Router();

/**
 * Get
 */
router.get("/get", (req, res, next) => {
    const workitem = req.query.workitem;

    pool.query(
        "SELECT * FROM todo WHERE workitem=$1 ORDER BY done,timestamp_insert DESC", [workitem],
        (error, results) => {
            if (error) {
                throw error;
            }
            // console.log(results.rows);
            return res.status(200).json(results.rows);
        }
    );
});

router.post("/insert", (req, res, next) => {
    const todo = req.body.todo;

    pool.query(
        "INSERT INTO todo (todo,done,workitem) VALUES($1,$2,$3)", [todo.todo, todo.done, todo.workitem],
        (error, results) => {
            if (error) {
                console.log(error);
                let errorNumber = 500;
                if (error.routine === "_bt_check_unique") errorNumber = 409;
                return res.status(errorNumber).json({
                    code: errorNumber,
                    message: errorNumber === 409 ?
                        "Todo " + " already exsists" :
                        "Generic network error!",
                });
            }
            // qui ritorna che tutto è andato ok
            return res.status(201).json({
                message: "Todo created successfully",
                result: results.rowCount,
            });
        }
    );
});

/**
 * Update
 */
router.post("/update", (req, res, next) => {
    const todo = req.body.todo;
    pool.query(
        "UPDATE todo SET todo=$1, done=$2 WHERE id=$3", [todo.todo, todo.done, todo.id],
        (error, results) => {
            if (error) {
                throw error;
            }
            if (results.rowCount > 0) {
                return res.status(200).json({
                    status: 200,
                });
            } else {
                return res.status(401).json({
                    code: 401,
                    message: "Todo does not exsists!!",
                });
            }
        }
    );
});

router.delete("/delete", (req, res, next) => {
    const id = req.body.id;
    pool.query("DELETE FROM todo WHERE id = $1  ", [id], (error, results) => {
        if (error) {
            console.log(error);
            let errorNumber = 500;
            if (error.routine === "_bt_check_unique") errorNumber = 409;

            return res.status(errorNumber).json({
                code: errorNumber,
                message: errorNumber === 409 ?
                    "Todo " + relation.id + " doesn't exsists" :
                    "Generic network error!",
            });
        }
        res.status(200).json(results.rows);
    });
});

module.exports = router;