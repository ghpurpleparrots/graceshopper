const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    await User.create(req.body)
    res.sendStatus(201)
  } catch (error) {
    next(error)
  }
})

router.put('/:userId', async (req, res, next) => {
  try {
    let user = await User.findByPk(req.params.userId)
    if (!user) {
      next()
    } else {
      let updatedUser = await user.update(req.body)
      res.send(updatedUser)
    }
  } catch (error) {
    next(error)
  }
})
