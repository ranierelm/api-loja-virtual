import express from 'express';
import ProductController from '../controllers/ProductController.js';

const router = express.Router();

router.get('/search', ProductController.search);

router.use('/',(req, res) => {
    res.json({result:'Yandeh Marketplace API connected!'})
  });

export default router;
