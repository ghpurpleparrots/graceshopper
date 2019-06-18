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
      res.end()
    }
  } catch (error) {
    next(error)
  }
})

//get a list of an User's completed orders

router.get('/:userId/ordered', auth.isAuthorized, async (req, res, next) => {
  try {
    const allCompletedOrders = await Order.findAll({
      where: {
        userId: req.params.userId,
        status: 'ordered'
      }
    })
    res.send(allCompletedOrders)
  } catch (error) {
    next(error)
  }
})

// create a new order
router.post('/:userId', async (req, res, next) => {
  try {
    const newOrder = await Order.create({
      status: 'inCart'
    })
    if (req.params.userId === 'guest') {
      res.json(newOrder.id)
    } else {
      newOrder.setUser(req.params.userId)
      res.json(newOrder.id)
    }
  } catch (err) {
    next(err)
  }
})

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
        price: req.body.price,
        shippingAddress: req.body.shippingAddress
      })
      res.sendStatus(200)
    }
  } catch (error) {
    next(error)
  }
})

//un-used post route, association tables
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
