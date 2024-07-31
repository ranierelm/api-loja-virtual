import OrderService from "../services/OrderService.js";

export default class OrderController {
  static async create(req, res) {
    try {
      const { clientId, products } = req.body;

      if (!clientId)
        return res.status(400).json({ error: "clientId is required" });
      if (!Array.isArray(products) || products.length === 0) {
        return res
          .status(400)
          .json({ error: "Products is required and must be an array" });
      }

      const order = await OrderService.createOrder(clientId, products);

      return res.status(201).json({ order: order });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
