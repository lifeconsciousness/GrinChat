const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
// const { use } = require('../routes/userRoutes')

const registerUser = asyncHandler(async (req, res) => {
  const { email, password, name, picture } = req.body

  if (!email || !password || !name) {
    res.status(400)
    throw new Error('Please fill all fields')
  }

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    email,
    password,
    name,
    picture,
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      email: user.email,
      name: user.name,
      picture: user.picture,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Failed to create a user')
  }
})

module.exports = { registerUser }
