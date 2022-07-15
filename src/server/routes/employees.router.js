import express from "express";
import * as employees from "../controllers/employees.controller";

const router = express.Router();

router.get("/:id?", async (req, res, next) => {
try {
    let { id } = req.params;
    let results;

    if (id) {
    id = parseInt(id);

    if (isNaN(id)) {
        let err = new Error("EmployeeID must be of type 'number'");
        err.status = 400;
        throw err;
    }

    [results] = await employees.findOneById(id);
    } else {
    results = await employees.findAll();
    }

    res.json(results || { msg: `No employee found with id: ${id}` });
} catch (err) {
    next(err);
}
});

router.post("/", async (req, res, next) => {
try {
    let { body } = req;

    let { insertId } = await employees.createOne(body);
    res.json({
    id: insertId,
    msg: "Successfully added employee"
    });
} catch (err) {
    next(err);
}
});

router.put("/:id", async (req, res, next) => {
try {
    let { body } = req;
    let id = parseInt(req.params.id);

    if (isNaN(id)) {
    let err = new Error("EmployeeID must be of type 'number'");
    err.status = 400;
    throw err;
    } else {
    let { affectedRows } = await employees.updateOne(body, id);
    res.json({
        id,
        msg:
        affectedRows > 0
            ? "Successfully updated employee(s)"
            : `No employee found to update with id: ${id}`,
    });
    }
} catch (err) {
    next(err);
}
});

router.delete("/:id", async (req, res, next) => {
try {
    let id = parseInt(req.params.id);

    if (isNaN(id)) {
    let err = new Error("EmployeeID must be of type 'number'");
    err.status = 400;
    throw err;
    } else {
    let { affectedRows } = await employees.deleteOne(id);
    res.json({
        id,
        msg:
        affectedRows > 0
            ? "Successfully deleted employee(s)"
            : `No employee found to delete with id: ${id}`,
    });
    }
} catch (err) {
    next(err);
}
});

export default router;
