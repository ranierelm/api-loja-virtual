import { addDays } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";

export default class OrderService {
  static async createOrder(clientId, products) {
    const totalValue = OrderService.calculateTotalValue(products);
    const deliveryDate = OrderService.calculateDeliveryDate();

    const orderStatusId = 5;

    try {
      const transaction = await Order.sequelize.transaction();

      const order = await Order.create(
        {
          total_value: totalValue,
          client_id: clientId,
          order_status_id: orderStatusId,
          delivery_date: deliveryDate,
        },
        { transaction }
      );

      const orderItems = products.map((product) => ({
        order_id: order.id,
        product_id: product.id,
        quantity: product.quantity,
        unit_price: product.unit_price,
      }));

      await OrderItem.bulkCreate(orderItems, { transaction });

      await transaction.commit();

      return order;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static calculateTotalValue(products) {
    if (!Array.isArray(products)) {
      throw new Error("Products must be an array");
    }

    return products.reduce((total, product) => {
      if (!product.quantity || !product.unit_price) {
        throw new Error("Product missing quantity or unit_price");
      }
      return total + product.quantity * product.unit_price;
    }, 0);
  }

  static calculateDeliveryDate(orderDate = new Date()) {
    const now = orderDate;
    const timeZone = "America/Sao_Paulo";

    let deliveryDays = 3;
    const dayOfWeek = now.getUTCDay();
    const hours = parseInt(formatInTimeZone(now, timeZone, "HH"));

    if (dayOfWeek === 4 && hours <= 13) {
      deliveryDays = 4;
    } else if (dayOfWeek >= 5) {
      deliveryDays = 5;
    }

    const deliveryDate = addDays(now, deliveryDays);
    const formattedDeliveryDate = formatInTimeZone(
      deliveryDate,
      timeZone,
      "yyyy-MM-dd'T'HH:mm:ss.SSSXXX"
    );

    return formattedDeliveryDate;
  }
}
