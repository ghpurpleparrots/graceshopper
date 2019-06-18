const {User} = require('../db/models')

module.exports.isAuthorized = async function(req, res, next) {
  try {
    let user
    if (req.session.userId) {
      user = await User.findByPk(req.session.userId)
    } else {
      user = await User.findByPk(req.user.id)
    }
    if (!user) {
      let err = new Error('Not authorized! Go back')
      err.status = 400
      next(err)
    } else if (user.id != req.params.userId) {
      let err = new Error('Not authorized! Go back')
      err.status = 400
      next(err)
    } else {
      next()
    }
  } catch (error) {
    next(error)
  }
}
