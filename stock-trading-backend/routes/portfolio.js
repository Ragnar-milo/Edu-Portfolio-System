const express = require('express');
const router = express.Router();
const { Portfolio } = require('../models');

router.post('/', async (req, res) => {
  const { userId, symbol, quantity, currentPrice } = req.body;
  try {
    const portfolioItem = await Portfolio.create({ userId, symbol, quantity, currentPrice });
    res.status(201).json(portfolioItem);
  } catch (error) {
    console.error('Error saving portfolio:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const portfolio = await Portfolio.findAll({ where: { userId } });
    res.status(200).json(portfolio);
  } catch (error) {
    console.error('Error retrieving portfolio:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;