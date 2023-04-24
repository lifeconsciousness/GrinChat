const mongoose = require('mongoose')

const userModel = mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    picture: {
      type: String,
      default: 'https://cdn.pixabay.com/photo/2016/10/11/16/14/capybara-1732020_960_720.jpg',
    },
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model('User', userModel)

module.exports = User
