const router = require('express').Router()
const {Order, OrderProducts, ItemQuantity} = require('../db/models')
module.exports = router

router.get('/:userId', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.params.userId,
        status: 'inCart'
      }
    })
    console.log(order)
    if (order) {
      let orderId = order.id
      let orderContent = await OrderProducts.findAll({
        where: {
          orderId: orderId
        }
      })
      let example = orderContent[0].groupId
      let groupArr = []

      orderContent.forEach(item => {
        if (!groupArr.includes(item.groupId)) {
          groupArr.push(item.groupId)
        }
      })

      console.log(groupArr)

      console.log('HELLOOOOO', example)
      res.json(order.id)
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

router.post('/', async (req, res, next) => {
  try {
    console.log(req.body)
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
