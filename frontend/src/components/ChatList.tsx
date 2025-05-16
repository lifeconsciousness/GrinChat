import React, { useEffect, useState } from 'react'
import { ChatState } from '../context/ChatProvider'
import axios from 'axios'
import ErrorDisplay from './Authentication/ErrorDisplay'
import UserListItem from './User/UserListItem'
import isEqual from 'lodash/isEqual'

type Props = {
  boxWidth: number
  fetchAgain: boolean
}

const ChatList = ({ boxWidth, fetchAgain }: Props) => {
  const [loggedUser, setLoggedUser] = useState<string | null>(null)
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState()

  //error handling boilerplate
  const [errorMessage, setErrorMessage] = useState('')
  const [counter, setCounter] = useState(0)

  const sendErrorText = (text) => {
    setErrorMessage((prevMessages) => prevMessages + text)
    setCounter(counter + 1)
  }

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }

      const { data } = await axios.get(`/api/chats`, config)
      // console.log(data)

      setChats(data)
    } catch (error) {
      sendErrorText('Failed to load chats')
    }
  }

  useEffect(() => {
    // console.log(chats)

    const userInfo = localStorage.getItem('userInfo')
    if (userInfo) {
      setLoggedUser(JSON.parse(userInfo))
      fetchChats()
    }
  }, [fetchAgain])

  return (
    <div>
      {chats.length === 0 ? (
        <div>Your chats will be here</div>
      ) : (
        chats.map((chat) => (
          <div
            key={chat._id}
            style={{
              backgroundColor: selectedChat === chat ? 'rgba(28, 74, 225, 0.247)' : 'rgb(25, 22, 36)',
            }}
          >
            <UserListItem
              key={chat._id}
              user={chat}
              handleFunction={() => {
                setSelectedChat(chat)
              }}
              chatListWidth={boxWidth}
              isSearching={true}
            />
          </div>
        ))
      )}
      {counter === 0 ? null : <ErrorDisplay errMessage={errorMessage} rerender={counter} />}
    </div>
  )
}

export default ChatList
