const pool = require("./connection");
const express = require("express");
const router = express.Router();

router.get("/getSprints", (req, res, next) => {
    pool.query("SELECT * FROM sprint", [], (error, results) => {
        if (error) {
            throw error;
        }
        return res.status(200).json(results.rows);
    });
});

router.get("/get", (req, res, next) => {
    const sprint = req.query.sprint;

    pool.query(
        "SELECT * FROM workitem WHERE sprint=$1 ORDER BY color", [sprint],
        (error, results) => {
            if (error) {
                throw error;
            }
            // console.log(results.rows);
            return res.status(200).json(results.rows);
        }
    );
});

router.get("/getAll", (req, res, next) => {
    pool.query("SELECT * FROM workitem", [], (error, results) => {
        if (error) {
            throw error;
        }
        // console.log(results.rows);
        return res.status(200).json(results.rows);
    });
});

router.post("/update", (req, res, next) => {
    const wi = req.body.workitem;

    pool.query(
        "UPDATE workitem SET wi=$1, description=$2, days=$3, sprint=$4, status=$5, color=$6, todo=$7 WHERE id=$8", [
            wi.wi,
            wi.description,
            wi.days,
            wi.sprint,
            wi.status,
            wi.color,
            wi.todo,
            wi.id,
        ],
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
                    message: "Workitem does not exsists!!",
                });
            }
        }
    );
});

router.post("/insertSprint", (req, res, next) => {
    const sp = req.body.sprint;

    pool.query(
        "INSERT INTO sprint (sprint,start_sprint,end_sprint) VALUES($1,$2,$3)", [sp.sprint, sp.start, sp.end],
        (error, results) => {
            if (error) {
                console.log(error);
                let errorNumber = 500;
                if (error.routine === "_bt_check_unique") errorNumber = 409;
                return res.status(errorNumber).json({
                    code: errorNumber,
                    message: errorNumber === 409 ?
                        "Sprint " + " already exsists" :
                        "Generic network error!",
                });
            }
            // qui ritorna che tutto è andato ok
            return res.status(201).json({
                message: "Sprint created successfully",
                result: results.rowCount,
            });
        }
    );
});

router.post("/insertWorkitem", (req, res, next) => {
    const wi = req.body.workitem;

    pool.query(
        "INSERT INTO workitem (wi,description,days,sprint,status,color,todo) VALUES($1,$2,$3,$4,$5,$6,$7)", [wi.wi, wi.description, wi.days, wi.sprint, wi.status, wi.color, wi.todo],
        (error, results) => {
            if (error) {
                console.log(error);
                let errorNumber = 500;
                if (error.routine === "_bt_check_unique") errorNumber = 409;
                return res.status(errorNumber).json({
                    code: errorNumber,
                    message: errorNumber === 409 ?
                        "Workitem " + " already exsists" :
                        "Generic network error!",
                });
            }
            // qui ritorna che tutto è andato ok
            return res.status(201).json({
                message: "Workitem created successfully",
                result: results.rowCount,
            });
        }
    );
});

router.delete("/deleteWorkitem", (req, res, next) => {
    console.log(req.body);
    const id = req.body.id;
    pool.query("DELETE FROM workitem WHERE id = $1  ", [id], (error, results) => {
        if (error) {
            console.log(error);
            let errorNumber = 500;
            if (error.routine === "_bt_check_unique") errorNumber = 409;

            return res.status(errorNumber).json({
                code: errorNumber,
                message: errorNumber === 409 ?
                    "Relation " + relation.id + " doesn't exsists" :
                    "Generic network error!",
            });
        }
        res.status(200).json(results.rows);
    });
});

module.exports = router;