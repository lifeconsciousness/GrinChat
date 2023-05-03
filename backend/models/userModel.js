const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

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

userModel.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userModel.pre('save', async function (next) {
  if (!this.isModified) {
    next()
  }
  const salt = await bcrypt.genSalt(12)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userModel)

module.exports = User
