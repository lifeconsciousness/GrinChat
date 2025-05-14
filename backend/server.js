const express = require('express')
const dotenv = require('dotenv')
// const { chats } = require('./data/data')
const connectDB = require('./config/db')
const colors = require('colors')
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const messageRoutes = require('./routes/messageRoutes')
const cron = require('node-cron')
const axios = require('axios')
const { notFound, errorHandler } = require('./middlewares/errorMiddleware')
const path = require('path')

dotenv.config()
connectDB()
const app = express()

app.use(express.json()) //accept json data

app.use('/api/user', userRoutes)
app.use('/api/chats', chatRoutes)
app.use('/api/message', messageRoutes)

//deployment
const __dirname1 = path.resolve()

if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '..', 'dist')
  app.use(express.static(distPath))
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'))
  })
} else {
  // In development, forward all non-API routes to the frontend dev server
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.redirect('http://localhost:5173' + req.path)
    } else {
      res.status(404).send('API route not found')
    }
  })
}

const PORT = process.env.PORT || 6000

const server = app.listen(PORT, console.log(`Server stared on PORT ${PORT}`.yellow.bold))


function pingServer() {
  const serverUrl = 'https://grinchat-8yvp.onrender.com'

  axios.get(serverUrl).catch((error) => {
    console.error('Error pinging server:', error)
  })
}

cron.schedule('*/10 * * * *', pingServer)

//socket.io

const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors: {
    origin: `${
      process.env.NODE_ENV === 'production' ? 'https://grinchat-8yvp.onrender.com' : `http://localhost:${process.env.PORT}`
    } `,
  },
})

io.on('connection', (socket) => {
  console.log('connected to socket.io')

  socket.on('setup', (userData) => {
    socket.join(userData._id)
    socket.emit('connected')
  })

  socket.on('join chat', (room) => {
    socket.join(room)
    console.log('User joined room' + room)
  })

  socket.on('new message', (newMessageReceived) => {
    let chat = newMessageReceived.chat

    if (!chat.users) return console.log('chat.users not defined')

    chat.users.forEach((user) => {
      if (user._id === newMessageReceived.sender._id) return

      socket.in(user._id).emit('message received', newMessageReceived)
    })
  })
})
