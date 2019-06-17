const router = require('express').Router()
module.exports = router
const stripe = require('stripe')('sk_test_muHAkmt4AqOwsr60imrUZhyR00dXLeIDNs')

router.get('/', async (req, res, next) => {
  try {
    {
      const charge = await stripe.charges.create({
        amount: 999,
        currency: 'usd',
        source: 'tok_visa',
        receipt_email: 'jenny.rosen@example.com'
      })
      res.json(charge)
    }
  } catch (err) {
    next(err)
  }
})

router.post('/charge', async (req, res) => {
  try {
    let {status} = await stripe.charges.create({
      amount: 2000,
      currency: 'usd',
      description: 'An example charge',
      source: req.body
    })

    res.json({status})
  } catch (err) {
    res.status(500).end()
  }
})
