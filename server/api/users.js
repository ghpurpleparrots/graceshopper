const router = require('express').Router()
const {User} = require('../db/models')
const auth = require('./authMiddleware')
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

//update user info
router.put('/:userId', auth.isAuthorized, async (req, res, next) => {
  try {
    let user = await User.findByPk(req.params.userId)
    if (!user) {
      next()
    } else {
      let updatedUser = await user.update({
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        admin: false
      })
      res.send(updatedUser)
    }
  } catch (error) {
    next(error)
  }
})
