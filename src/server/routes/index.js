import express from "express";
import productsRouter from "./products.router";
import employeesRouter from "./employees.router";
import { notFoundHandler } from "../middlewares/notFound";

const router = express.Router();

router.get("/test", (req, res, next) => {
  res.send("Hello World!");
});

router.use("/products", productsRouter);

router.use("/employees", employeesRouter);

router.use(notFoundHandler);

export default router;
