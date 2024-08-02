import Product from "../models/Product.js";

import { Op, literal } from "sequelize";
import removeAccents from "remove-accents";

export default class ProductService {
  static async searchProducts(query = "", page = 1, limit = 10) {
    if (typeof query !== "string") {
      throw new Error("Query must be a string");
    }

    const searchQuery = removeAccents(query.trim());
    const offset = (page - 1) * limit;

    const whereCondition = searchQuery
      ? {
          [Op.or]: [
            literal(`unaccent("name") ILIKE unaccent('%${searchQuery}%')`),
            literal(`unaccent("sku") ILIKE unaccent('%${searchQuery}%')`),
            literal(`unaccent("ean") ILIKE unaccent('%${searchQuery}%')`),
          ],
        }
      : {};

    const { count, rows } = await Product.findAndCountAll({
      where: whereCondition,
      limit,
      offset,
    });

    return {
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      products: rows,
    };
  }
}
