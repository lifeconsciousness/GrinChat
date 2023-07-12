const expressAsyncHandler = require('express-async-handler')

const sendMessage = expressAsyncHandler(async (req, res) => {
  const { content, chatId } = req.body

  if (!content || !chatId) {
    console.log('Invalid data passed into request')
    return res.sendStatus(400)
  }

  let newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  }
})

module.exports = { sendMessage }
