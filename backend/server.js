const express = require('express')
const dotenv = require('dotenv')
const { chats } = require('./data/data')

const app = express()
dotenv.config()

app.get('/', (req, res) => {
  res.send('API is running')
})

app.get('/api/chat', (req, res) => {
  res.send(chats)
})

app.get('/api/chat/:id', (req, res) => {
  const singleChat = chats.find((c) => c._id === req.params.id)
  res.send(singleChat)
})

const PORT = process.env.PORT || 7000

app.listen(7000, console.log(`Server stared on PORT ${PORT}`))
