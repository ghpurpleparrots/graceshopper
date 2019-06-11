const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  category: {
    type: Sequelize.ENUM(container, flavor, topping),
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER
  },
  description: {
    type: Sequelize.TEXT
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'product-default-image'
  }
})
