const {User} = require('../db/models')

module.exports.isAuthorized = async function(req, res, next) {
  try {
    let user = await User.findByPk(req.session.userId)
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
