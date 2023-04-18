const mongoose = require('mongoose')

const userModel = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    picture: {
      type: String,
      required: true,
      default:
        'https://cdn.pixabay.com/photo/2016/10/11/16/14/capybara-1732020_960_720.jpg',
    },
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model('User', userModel)

module.exports = User
