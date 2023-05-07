const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const generateToken = require('../config/generateToken')

const registerUser = asyncHandler(async (req, res) => {
  const { email, password, name, picture } = req.body

  if (!email || !password || !name) {
    res.status(400)
    throw new Error('Please fill all fields')
  }

  //checking is entered email is already in the database
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
    //writing data in the database
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

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user.id,
      email: user.email,
      name: user.name,
      picture: user.picture,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

const allUsers = asyncHandler(async (req, res) => {
  //URL/api/user/?search=johndoe - API endpoint
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: 'i' } },
          { email: { $regex: req.query.search, $options: 'i' } },
        ],
      }
    : {}

  //the second chained find() finds all users whose id is $ne (not equal) to the id of the user in request object
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } })
  res.send(users)
})

module.exports = { registerUser, loginUser, allUsers }
