import { CloseIcon } from '@chakra-ui/icons'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { ChatState } from '../context/ChatProvider'
import SideDrawer from './misc/SideDrawer'
import axios from 'axios'
import ChatLoading from './misc/ChatLoading'
import UserListItem from './User/UserListItem'
import ChatList from './ChatList'
import ErrorDisplay from './Authentication/ErrorDisplay'

type Props = {
  fetchAgain: any
}

const MyChats = ({ fetchAgain }: Props) => {
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState()

  interface User {
    _id: string
  }

  //user search
  const [search, setSearch] = useState('')
  const [searchResult, setsearchResult] = useState<User[]>([])
  const [loading, setloading] = useState(false)
  const [loadingChat, setloadingChat] = useState(false)

  //error handling boilerplate
  const [errorMessage, setErrorMessage] = useState('')
  const [counter, setCounter] = useState(0)

  const sendErrorText = (text) => {
    setErrorMessage((prevMessages) => prevMessages + text)
    setCounter(counter + 1)
  }

  useEffect(() => {
    setSearch('a')

    setTimeout(() => {
      setSearch('')
    }, 1)
  }, [])

  /////////////////////////////////////////////adjustable width of chat list

  const boxRef = useRef<HTMLDivElement | null>(null)
  const borderRef = useRef<HTMLDivElement | null>(null)
  const [isResizing, setIsResizing] = useState(false)
  const [lastX, setLastX] = useState(0)
  const [boxWidth, setboxWidth] = useState<number>(Number(localStorage.getItem('chatListWidth')) || 270)

  useEffect(() => {
    const box = boxRef.current
    const savedWidth = localStorage.getItem('chatListWidth')

    if (box && savedWidth) {
      box.style.width = `${Number(savedWidth)}px`
    }
    // else {
    //   if (box) {
    //     box.style.width = `px`
    //   }
    // }
  }, [])

  useEffect(() => {
    const box = boxRef.current
    const border = borderRef.current

    const handleMouseDown = (e: MouseEvent) => {
      setIsResizing(true)
      setLastX(e.clientX)
      document.body.style.userSelect = 'none'
    }

    const handleMouseMove = (e) => {
      if (!isResizing || !boxRef.current) return

      const box = boxRef.current
      const container = box.parentElement
      if (!container) return

      const containerRect = box.parentElement.getBoundingClientRect()
      const containerRight = containerRect.right
      const mouseOffsetX = containerRight - e.clientX
      const newWidth = containerRight - box.getBoundingClientRect().left - mouseOffsetX

      if (newWidth >= 280 && newWidth <= window.innerWidth / 2) {
        box.style.width = `${newWidth}px`
        setLastX(e.clientX)
        setboxWidth(newWidth)

        localStorage.setItem('chatListWidth', newWidth.toString())
      }
    }

    const handleMouseUp = () => {
      setIsResizing(false)
      document.body.style.userSelect = ''
    }

    if (border) {
      border.addEventListener('mousedown', handleMouseDown)
    }
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      if (border) {
        border.removeEventListener('mousedown', handleMouseDown)
      }
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizing, lastX])

  /////////////////////////////////////////////////////////////////////////

  /////searching for other users

  useEffect(() => {
    const fetchData = async () => {
      if (search !== '') {
        try {
          setloading(true)

          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }

          const { data } = await axios.get(`/api/user/?search=${search}`, config)

          setloading(false)
          setsearchResult(data)
        } catch (error) {
          sendErrorText('Failed to load chats')
        }
      }
    }

    fetchData()
  }, [search])

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const accessChat = async (userId: string) => {
    console.log(user._id)
    try {
      setloadingChat(true)

      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      }

      const { data } = await axios.post('/api/chats', { userId }, config)
      console.log(data)

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats])

      setSelectedChat(data)
      localStorage.setItem('selectedChat', JSON.stringify(data))
      setloadingChat(false)
    } catch (error) {
      sendErrorText('Failed to load chat')
    }
  }

  return (
    <div
      className="chats-container"
      ref={boxRef}
      style={{
        display: screen.width <= 520 ? (selectedChat ? 'none' : 'block') : 'block',
        // width: screen.width <= 520 ? (selectedChat ? '0% !important' : '100% !important') : '100% !important',
        // backgroundColor: screen.width <= 520 ? (selectedChat ? 'blue' : 'green') : 'yellow',
      }}
    >
      <div className="right-border" ref={borderRef}></div>

      <div className="hamburger-and-chat">
        <SideDrawer user={user} />

        <input
          type="text"
          placeholder="Search"
          className="search-field"
          value={search}
          onChange={(e) => handleSearch(e)}
        />
        {search.length >= 1 ? (
          <CloseIcon
            className="appear"
            color="black"
            position="absolute"
            opacity={0.85}
            right="10px"
            top="17px"
            cursor="pointer"
            onClick={() => {
              setSearch('')
            }}
          />
        ) : (
          ''
        )}
      </div>

      <div className="chats">
        {search.length === 0 ? (
          <ChatList boxWidth={boxWidth} fetchAgain={fetchAgain} />
        ) : loading ? (
          <ChatLoading />
        ) : (
          searchResult.map((user) => {
            return (
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => {
                  accessChat(user._id)
                  setSearch('')
                }}
                chatListWidth={boxWidth}
                isSearching={false}
              />
            )
          })
        )}
      </div>

      <>{counter === 0 ? '' : <ErrorDisplay errMessage={errorMessage} rerender={counter} />}</>
    </div>
  )
}

export default MyChats
