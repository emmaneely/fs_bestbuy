import express from "express";
import productsRouter from "./products.router";

const router = express.Router();

router.get("/test", (req, res, next) => {
  res.send("Hello World!");
});

router.use("/products", productsRouter);

export default router;
