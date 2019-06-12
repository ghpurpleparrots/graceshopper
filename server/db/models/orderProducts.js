const Sequelize = require('sequelize')
const db = require('../db')

const OrderProducts = db.define('order-products', {
  orderId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  groupId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = OrderProducts
