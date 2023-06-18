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
import React, { useEffect, useRef, useState } from 'react'
import { ChatState } from '../context/ChatProvider'
import SideDrawer from './misc/SideDrawer'

type Props = {}

const MyChats = ({}: Props) => {
  const { user } = ChatState()
  const [search, setsearch] = useState('')
  const [searchResult, setsearchResult] = useState([])
  const [loading, setloading] = useState(false)
  const [loadingChat, setloadingChat] = useState()

  //chakra ui drawer
  const { isOpen, onOpen, onClose } = useDisclosure()

  //adjustable width of chat list
  const boxRef = useRef<HTMLDivElement | null>(null)
  const borderRef = useRef<HTMLDivElement | null>(null)
  const [isResizing, setIsResizing] = useState(false)
  const [lastX, setLastX] = useState(0)

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

      if (newWidth >= 180 && newWidth <= 1000) {
        box.style.width = `${newWidth}px`
        setLastX(e.clientX)

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

  return (
    <div className="chats-container" ref={boxRef}>
      <div className="right-border" ref={borderRef}></div>

      <div className="hamburger-and-chat">
        <SideDrawer user={user} />

        <input type="text" placeholder="Search" className="search-field" />
      </div>

      <div className="chats">chat chat</div>
    </div>
  )
}

export default MyChats
