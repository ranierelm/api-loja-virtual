import express from "express";
import ProductController from "../controllers/ProductController.js";
import OrderController from "../controllers/OrderController.js";

import {
  validateOrder,
  validateStatusUpdate,
} from "../middlewares/orderValidation.js";

const router = express.Router();

router.get("/search", ProductController.search);

router.post("/orders/create", validateOrder, OrderController.create);
router.patch(
  "/orders/:id/status",
  validateStatusUpdate,
  OrderController.updateStatus
);

router.get("/", (req, res) => {
  res.json({ result: "API connected!" });
});

export default router;
