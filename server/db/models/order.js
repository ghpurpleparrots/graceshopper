const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  price: {
    type: Sequelize.INTEGER,
    defaultValue: 0.0,
    validate: {
      isFloat: true
    }
  },
  status: {
    type: Sequelize.ENUM('inCart', 'ordered')
  },
  orderInfo: {
    type: Sequelize.ARRAY(Sequelize.JSON)
  },
  shippingAddress: {
    type: Sequelize.JSON
  }
})

Order.beforeCreate(order => {
  order.orderInfo = JSON.stringify(order.orderInfo)
  order.shippingAddress = JSON.stringify(order.shippingAddress)
})

module.exports = Order
