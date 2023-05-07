const asyncHandler = require('express-async-handler')
const Chat = require('../models/chatModel')
const User = require('../models/userModel')

//access/create a personal chat with other user
const accessChat = asyncHandler(async (req, res) => {
  //id of the other user
  const { userId } = req.body

  if (!userId) {
    console.log('UserId param not sent with request')
    return res.sendStatus(400)
  }

  let isPersonalChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } }, //id of logged in user
      { users: { $elemMatch: { $eq: userId } } }, //id of another user
    ],
  })
    .populate('users', '-password')
    .populate('latestMessage')

  isPersonalChat = await User.populate(isPersonalChat, {
    path: 'latestMessage.sender',
    select: 'name picture email',
  })

  if (isPersonalChat.length > 0) {
    res.send(isPersonalChat[0])
  } else {
    let chatData = {
      chatName: 'sender',
      isGroupChat: false,
      users: [req.user._id, userId],
    }

    try {
      const createdChat = await Chat.create(chatData)

      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate('users', '-password')
      res.status(200).send(FullChat)
    } catch (error) {
      res.status(400)
      throw new Error(error.message)
    }
  }
})

const fetchChats = asyncHandler(async (req, res) => {
  try {
    //searches through all chats in database and finds chats that countain the id of logged in user
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate('users', '-password')
      .populate('groupAdmin', '-password')
      .populate('latestMessage')
      .sort({ updatedAt: -1 })
      .then(async (result) => {
        result = await User.populate(result, {
          path: 'latestMessage.sender',
          select: 'name picture email',
        })

        res.status(200).send(result)
      })
  } catch (error) {
    res.status(400)
    throw new Error(error.message)
  }
})

module.exports = { accessChat, fetchChats }
