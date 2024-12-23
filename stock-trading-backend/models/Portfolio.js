const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User ');

const Portfolio = sequelize.define('Portfolio', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  symbol: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  currentPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  }
}, {
  tableName: 'portfolios',
});

module.exports = Portfolio;