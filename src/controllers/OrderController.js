import OrderService from "../services/OrderService.js";
import Queue from "../lib/Queue.js";

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

      await Queue.add("ProcessingOrder", { order });

      return res.status(201).json({ order: order });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async updateStatus(req, res) {
    try {
      const { id } = req.params;
      const { status_id } = req.body;

      if (!id)
        return res
          .status(400)
          .json({ error: "Order id as a parameter is required!" });
      if (!status_id)
        return res.status(400).json({ error: "status_id is required" });

      await OrderService.updateOrderStatus(id, status_id);

      res.status(200).json({ message: "Status updated successfully!" });
    } catch (error) {
      res.status(500).json({ error: err.message });
      throw error;
    }
  }
}
