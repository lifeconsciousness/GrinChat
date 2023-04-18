import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ChatPage = () => {
  const [chats, setChats] = useState([])

  const fetchChats = async () => {
    const { data } = await axios.get('/api/chat')

    setChats(data)
    console.log(data)
  }

  useEffect(() => {
    fetchChats()
  }, [])

  return (
    <div>
      {chats.map((chat) => (
        <h2 key={chat._id}>{chat.chatName}</h2>
      ))}
    </div>
  )
}

export default ChatPage
