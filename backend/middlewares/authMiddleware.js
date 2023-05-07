const jwt = require('jsonwebtoken')
const User = require('../models/userModel.js')
const asyncHandler = require('express-async-handler')

const protect = asyncHandler(async (req, res, next) => {
  //use bearer token to find the user that is logged in
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      //provide the request with the user object and then use it in userController to exclude the user from the search list
      req.user = await User.findById(decoded.id).select('-password') //select without password
      next()
    } catch (err) {
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }
  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

module.exports = { protect }
