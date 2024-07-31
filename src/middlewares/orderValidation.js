import { body, validationResult } from "express-validator";

const validateOrder = [
  body("clientId").isInt().withMessage("clientId must be an integer"),
  body("products")
    .isArray({ min: 1 })
    .withMessage("Products must be an array with at least one item"),
  body("products.*.id").isInt().withMessage("Product ID must be an integer"),
  body("products.*.quantity")
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1"),
  body("products.*.unit_price")
    .isFloat({ min: 0 })
    .withMessage("Unit price must be a positive number"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export { validateOrder, validateStatusUpdate };
