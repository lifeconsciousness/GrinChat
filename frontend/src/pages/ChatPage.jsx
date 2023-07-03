import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ChatState } from '../context/ChatProvider'
import MyChats from '../components/MyChats'
import ChatBox from '../components/ChatBox'
import { Show, useDisclosure } from '@chakra-ui/react'
import {
  Menu,
  MenuButton,
  MenuList,
  Button,
  Avatar,
  MenuItem,
  MenuDivider,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
} from '@chakra-ui/react'
import { ArrowBackIcon, BellIcon, ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons'
import ProfileModal from '../components/misc/ProfileModal'
import useLogout from '../components/Authentication/Logout'
import useForceUpdate from '../components/misc/ForceUpdate'

const ChatPage = () => {
  const { user, selectedChat, setSelectedChat } = ChatState()
  const logout = useLogout()
  const forceUpdate = useForceUpdate()
  const [fetchAgain, setFetchAgain] = useState(false)

  useEffect(() => {
    window.addEventListener('resize', forceUpdate)

    return () => {
      window.removeEventListener('resize', forceUpdate)
    }
  }, [])

  return (
    <div className="chats-page">
      <MyChats fetchAgain={fetchAgain} />

      <nav
        className="navigation-panel"
        style={{ display: screen.width <= 520 ? (selectedChat ? 'block' : 'none') : 'block' }}
      >
        {/* <div className="options">
          <Menu>
            <MenuButton>
              <BellIcon fontSize="3xl" m={1} className="bell" userSelect="none" />
            </MenuButton>
            <MenuList></MenuList>
          </Menu>
          <Menu>
            <MenuButton color={'black'}>
              <Avatar
                size="md"
                cursor="pointer"
                name={user?.name}
                src={user?.picture}
                className="avatar"
                userSelect="none"
              />
            </MenuButton>
            <MenuList color="black">
              <ProfileModal user={user}>
                <MenuItem>My profile</MenuItem>
              </ProfileModal>
              <MenuItem>Settings</MenuItem>
              <MenuDivider />
              <MenuItem onClick={logout}>Log out</MenuItem>
            </MenuList>
          </Menu>
        </div> */}

        <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      </nav>
    </div>
  )
}

export default ChatPage
