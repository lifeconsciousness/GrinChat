import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ChatState } from '../context/ChatProvider'
import MyChats from '../components/MyChats'
import ChatBox from '../components/ChatBox'
import { useDisclosure } from '@chakra-ui/react'
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
import { BellIcon, ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons'

const ChatPage = () => {
  const { user } = ChatState()
  // const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <div className="chats-page">
      {/* {!isOpen ? <HamburgerIcon onClick={onOpen} cursor="pointer" fontSize="4xl" className="burger-icon" /> : ''} */}

      <MyChats />

      <nav className="navigation-panel">
        <div className="options">
          <Menu>
            <MenuButton>
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
            {/* <MenuList></MenuList> */}
          </Menu>
          <Menu>
            <MenuButton color={'black'}>
              <Avatar size="sm" cursor="pointer" name={user?.name} src={user?.picture} />
            </MenuButton>
            <MenuList color="black">
              <MenuItem>My profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuDivider />
              <MenuItem>Log out</MenuItem>
            </MenuList>
          </Menu>
        </div>

        <ChatBox />
      </nav>
    </div>
  )
}

export default ChatPage
