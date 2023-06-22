import React, { useEffect, useState } from 'react'
import { ChatState } from '../context/ChatProvider'
import axios from 'axios'
import ErrorDisplay from './Authentication/ErrorDisplay'
import UserListItem from './User/UserListItem'
import isEqual from 'lodash/isEqual'

type Props = {
  boxWidth: any
}

const ChatList = ({ boxWidth }: Props) => {
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

      setChats(data)
    } catch (error) {
      sendErrorText('Failed to load chats')
    }
  }

  useEffect(() => {
    console.log(chats)
    console.log(selectedChat)

    const userInfo = localStorage.getItem('userInfo')
    if (userInfo) {
      setLoggedUser(JSON.parse(userInfo))
      fetchChats()
    }
  }, [])

  return (
    <div>
      {chats.map((chat) => {
        return (
          <div
            key={chat._id}
            style={{
              backgroundColor:
                selectedChat === chat ||
                (localStorage.getItem('selectedChat') !== null &&
                  isEqual(JSON.parse(localStorage.getItem('selectedChat') || ''), chat))
                  ? 'rgba(28, 74, 225, 0.247)'
                  : '',

              // backgroundColor:
              //   selectedChat === chat || JSON.parse(localStorage.getItem('selectedChat') ?? '') === chat
              //     ? 'rgba(28, 74, 225, 0.247)'
              //     : '',
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
        )
      })}
      <>{counter === 0 ? '' : <ErrorDisplay errMessage={errorMessage} rerender={counter} />}</>
    </div>
  )
}

export default ChatList
