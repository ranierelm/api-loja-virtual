import ProductService from '../services/ProductService.js';

export default class ProductController {
  static async search(req, res) {
    try {
      const { query, page, limit } = req.query;
      const pageNum = parseInt(page, 10) || 1;
      const limitNum = parseInt(limit, 10) || 10;
      const products = await ProductService.searchProducts(query, pageNum, limitNum);
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

}