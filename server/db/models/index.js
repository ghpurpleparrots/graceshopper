const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const OrderProducts = require('./orderProducts')
const ItemQuantity = require('./itemQuantity')

Order.belongsTo(User)
User.hasMany(Order)

Order.belongsToMany(Product, {through: 'order-products'})
Product.belongsToMany(Order, {through: 'order-products'})

module.exports = {
  User,
  Product,
  Order,
  OrderProducts,
  ItemQuantity
}
