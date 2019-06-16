const router = require('express').Router()
const {Order, OrderProducts, ItemQuantity} = require('../db/models')
const auth = require('./authMiddleware')

module.exports = router

router.get('/', async (req, res, next) => {
  const allOrders = await Order.findAll()
  res.send(allOrders)
})

//get a user's 'inCart' order
router.get('/:userId', auth.isAuthorized, async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.params.userId,
        status: 'inCart'
      }
    })
    if (order) {
      res.json(order)
    } else {
      const newOrder = await Order.create({
        status: 'inCart'
      })
      newOrder.setUser(req.params.userId)
      res.json(newOrder.id)
    }
  } catch (error) {
    next(error)
  }
})
//create a new order
// router.post('/:userId', async (req, res, next) => {
//   const newOrder = await Order.create({
//     status: 'inCart'
//   })
//   newOrder.setUser(req.params.userId)
//   res.json(newOrder.id)
// })

//add to cart route
router.put('/add', async (req, res, next) => {
  try {
    let order = await Order.findByPk(req.body.orderId)
    if (!order) {
      next()
    } else {
      await order.update({
        orderInfo: req.body.cart
      })
      res.sendStatus(200)
    }
  } catch (error) {
    next(error)
  }
})

router.get('/:userId/orders', auth.isAuthorized, async (req, res, next) => {
  try {
    const userOrders = await Order.findAll({
      where: {
        userId: req.params.userId,
        status: 'ordered'
      }
    })

    res.send(userOrders)
  } catch (error) {
    next(error)
  }
})

//submit order route
router.put('/submit', async (req, res, next) => {
  try {
    let order = await Order.findByPk(req.body.orderId)
    if (!order) {
      next()
    } else {
      await order.update({
        status: 'ordered',
        orderInfo: req.body.cart,
        price: req.body.price
      })
      res.sendStatus(200)
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    let productId = req.body.productId
    let orderId = req.body.orderId
    let groupId = req.body.groupId
    let dataOrdProd = []
    productId.forEach(prodId => {
      dataOrdProd.push({orderId, groupId, productId: prodId})
    })
    await OrderProducts.bulkCreate(dataOrdProd)
    await ItemQuantity.create({orderId, groupId, quantity: 1})
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})
