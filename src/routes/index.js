import express from 'express';

const router = express.Router();

router.use('/',(req, res) => {
    res.json({result:'Yandeh Marketplace API connected!'})
  });

export default router;
