const Sequelize = require('sequelize')
const db = require('../db')

const ItemQuantity = db.define('item-quantity', {
  orderId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  groupId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = ItemQuantity
