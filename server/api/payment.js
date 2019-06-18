const router = require('express').Router()
module.exports = router
const STRIPE_SECRET_KEY = require('../../secrets')
const stripe = require('stripe')(STRIPE_SECRET_KEY)

const stripeChargeCallback = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({error: stripeErr})
  } else {
    res.status(200).send({success: stripeRes})
  }
}

router.get('/', async (req, res, next) => {
  try {
    res.send({
      message: 'Hello Stripe Checkout server!',
      timestamp: new Date().toISOString()
    })
  } catch (err) {
    next(err)
  }
})

router.post('/', (req, res) => {
  try {
    const body = {
      source: req.body.token.id,
      amount: req.body.amount,
      currency: 'usd'
    }
    stripe.charges.create(body, stripeChargeCallback(res))
  } catch (err) {
    res.status(500).end()
  }
})
