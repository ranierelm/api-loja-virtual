import express from "express";
import ProductController from "../controllers/ProductController.js";
import OrderController from "../controllers/OrderController.js";

import { validateOrder } from "../middlewares/orderValidation.js";

const router = express.Router();

router.get("/search", ProductController.search);

router.post("/create-order", validateOrder, OrderController.create);

router.get("/", (req, res) => {
  res.json({ result: "Yandeh Marketplace API connected!" });
});

export default router;
