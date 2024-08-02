import OrderService from "../services/OrderService.js";

export default {
  key: "ProcessingOrder",
  async handle({ data }) {
    const { order } = data;

    // Exemplo: processar faturamento
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log("Faturamento realizado");

    const statusId = 10; //"Invoiced"

    //alterar o status para faturado

    console.log(order.id);
    console.log(statusId);
    await OrderService.updateOrderStatus(order.id, statusId);
    console.log("Pedido processado - Status: Faturado");
  },
};
