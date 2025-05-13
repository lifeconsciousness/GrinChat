# GrinChat

GrinChat is a full-stack real-time chat application that enables users to connect and communicate instantly. Built with the MERN stack (MongoDB, Express.js, React, Node.js), it provides a seamless chatting experience with modern features.

## 🌟 Features

- **User Authentication**: Secure registration and login system
- **Real-time Messaging**: Instant message delivery using Socket.IO
- **User Search**: Find and connect with other users easily
- **Responsive Design**: Works seamlessly on both desktop and mobile devices
- **Message History**: All conversations are stored and can be accessed anytime

## 🛠️ Tech Stack

- **Frontend**: React.js, Chakra UI, Socket.IO-client
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Real-time Communication**: Socket.IO

## 🚀 Live Demo

Check out the live version: [GrinChat](https://grinchat-8yvp.onrender.com/)

## 💻 Local Development

1. Clone the repository
```bash
git clone https://github.com/your-username/GrinChat-MERN-chat-app.git
```

2. Install dependencies for both backend and frontend
```bash
# Root directory
npm install

# Frontend directory
cd frontend
npm install
```

3. Create a .env file in the root directory with:
```
NODE_ENV=development
PORT=6000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

4. Start the development server
```bash
# Start backend (from root directory)
npm start

# Start frontend (from frontend directory)
npm run dev
```

## 👨‍💻 Author

Maksym Tovstolis

## 📝 License

MIT


