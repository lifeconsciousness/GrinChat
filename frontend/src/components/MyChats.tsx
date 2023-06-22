import { BellIcon, HamburgerIcon, Search2Icon } from '@chakra-ui/icons'
import {
  Avatar,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useBreakpointValue,
  useDisclosure,
  Divider,
} from '@chakra-ui/react'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { ChatState } from '../context/ChatProvider'
import SideDrawer from './misc/SideDrawer'
import axios from 'axios'
import ChatLoading from './misc/ChatLoading'
import UserListItem from './User/UserListItem'
import ChatList from './ChatList'
import ErrorDisplay from './Authentication/ErrorDisplay'

type Props = {}

const MyChats = ({}: Props) => {
  const { user, setSelectedChat, chats, setChats } = ChatState()

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
  const [boxWidth, setboxWidth] = useState<number>()

  useEffect(() => {
    const box = boxRef.current
    const savedWidth = localStorage.getItem('chatListWidth')

    if (box && savedWidth) {
      box.style.width = `${Number(savedWidth)}px`
    }
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

      if (newWidth >= 280 && newWidth <= screen.width / 2) {
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

  /////searching other users

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

  const accessChat = async (secondUser: object) => {
    console.log(user._id)
    try {
      setloadingChat(true)

      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      }

      const { data } = await axios.post('/api/chats', { secondUser }, config)
      console.log(data)

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats])

      setSelectedChat(data)
      setloadingChat(false)
    } catch (error) {
      sendErrorText('Failed to load chat')
    }
  }

  return (
    <div className="chats-container" ref={boxRef}>
      <div className="right-border" ref={borderRef}></div>

      <div className="hamburger-and-chat">
        <SideDrawer user={user} />

        <input
          type="text"
          placeholder="Search"
          className="search-field"
          value={search}
          // onChange={(e) => setSearch(e.target.value)}
          onChange={(e) => handleSearch(e)}
        />
      </div>

      <div className="chats">
        {/* {searchResult.length === 0 && <p className="start-message-in-chats">Message someone</p>} */}
        {search.length === 0 ? (
          <ChatList boxWidth={boxWidth} />
        ) : loading ? (
          <ChatLoading />
        ) : (
          searchResult.map((user) => {
            return (
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => {
                  accessChat(user)
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
