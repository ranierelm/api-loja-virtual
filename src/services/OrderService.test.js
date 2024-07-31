import { addDays } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

import OrderService from "./OrderService.js";

jest.mock("../models/Order.js");
jest.mock("../models/OrderItem.js");

describe("OrderService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("calculateTotalValue", () => {
    it("should calculate the total value of products", () => {
      const products = [
        { id: 21, quantity: 20, unit_price: 2.5 },
        { id: 64, quantity: 10, unit_price: 20.1 },
      ];
      const totalValue = OrderService.calculateTotalValue(products);
      expect(totalValue).toBe(251);
    });

    it("should throw an error if products is not an array", () => {
      expect(() => OrderService.calculateTotalValue(null)).toThrow(
        "Products must be an array"
      );
    });

    it("should throw an error if product is missing quantity or unit_price", () => {
      const products = [{ id: 1, quantity: 2 }];
      expect(() => OrderService.calculateTotalValue(products)).toThrow(
        "Product missing quantity or unit_price"
      );
    });
  });

  describe("calculateDeliveryDate", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should calculate the delivery date as D+3 if the order is placed between Monday and Wednesday", () => {
      const mondayOrderDate = new Date("2024-07-29T12:00:00Z");
      const tuesdayOrderDate = new Date("2024-07-30T12:00:00Z");
      const wednesdayOrderDate = new Date("2024-07-31T12:00:00Z");

      const deliveryDateOne =
        OrderService.calculateDeliveryDate(mondayOrderDate);
      const deliveryDateTwo =
        OrderService.calculateDeliveryDate(tuesdayOrderDate);
      const deliveryDateThree =
        OrderService.calculateDeliveryDate(wednesdayOrderDate);

      const expectedDateOne = formatInTimeZone(
        addDays(mondayOrderDate, 3),
        "America/Sao_Paulo",
        "yyyy-MM-dd'T'HH:mm:ss.SSSXXX"
      );
      const expectedDateTwo = formatInTimeZone(
        addDays(tuesdayOrderDate, 3),
        "America/Sao_Paulo",
        "yyyy-MM-dd'T'HH:mm:ss.SSSXXX"
      );
      const expectedDateThree = formatInTimeZone(
        addDays(wednesdayOrderDate, 3),
        "America/Sao_Paulo",
        "yyyy-MM-dd'T'HH:mm:ss.SSSXXX"
      );
      expect(deliveryDateOne).toBe(expectedDateOne);
      expect(deliveryDateTwo).toBe(expectedDateTwo);
      expect(deliveryDateThree).toBe(expectedDateThree);
    });

    it("should calculate the delivery date as D+4 if the order is placed on Thursday before 13:00 BRT", () => {
      const orderDate = new Date("2024-07-25T12:00:00Z");

      const deliveryDate = OrderService.calculateDeliveryDate(orderDate);

      const expectedDate = formatInTimeZone(
        addDays(orderDate, 4),
        "America/Sao_Paulo",
        "yyyy-MM-dd'T'HH:mm:ss.SSSXXX"
      );
      expect(deliveryDate).toBe(expectedDate);
    });

    it("should calculate the delivery date as D+5 if the order is placed on Friday or later", () => {
      const orderDate = new Date("2024-07-26T12:00:00Z");

      const deliveryDate = OrderService.calculateDeliveryDate(orderDate);
      const expectedDate = formatInTimeZone(
        addDays(orderDate, 5),
        "America/Sao_Paulo",
        "yyyy-MM-dd'T'HH:mm:ss.SSSXXX"
      );
      expect(deliveryDate).toBe(expectedDate);
    });
  });
});
