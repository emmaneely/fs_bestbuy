import express from "express";
import * as products from "../controllers/products.controller";

const router = express.Router();

router.get("/:id?", async (req, res, next) => {
  try {
    let { id } = req.params;
    let results;

    if (id) {
      id = parseInt(id);

      if (isNaN(id)) {
        let err = new Error("ProductID must be of type 'number'");
        err.status = 400;
        throw err;
      }

      [results] = await products.findOneById(id);
    } else {
      results = await products.findAll();
    }

    res.json(results || { msg: `No products found with id: ${id}` });
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    let { body } = req;

    let { insertId } = await products.createOne(body);
    res.json({
      id: insertId,
      msg: "Successfully added product"
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
      let err = new Error("ProductID must be of type 'number'");
      err.status = 400;
      throw err;
    } else {
      let { affectedRows } = await products.updateOne(body, id);
      res.json({
        id,
        msg:
          affectedRows > 0
            ? "Successfully updated product(s)"
            : `No product found to update with id: ${id}`,
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
      let err = new Error("ProductID must be of type 'number'");
      err.status = 400;
      throw err;
    } else {
      let { affectedRows } = await products.deleteOne(id);
      res.json({
        id,
        msg:
          affectedRows > 0
            ? "Successfully deleted product(s)"
            : `No product(s) found to delete with id: ${id}`,
      });
    }
  } catch (err) {
    next(err);
  }
});

export default router;
