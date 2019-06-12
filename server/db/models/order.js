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
  }
})

module.exports = Order
