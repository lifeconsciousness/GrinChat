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
import { BellIcon, ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons'

const ChatPage = () => {
  const { user } = ChatState()
  // const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <div className="chats-page">
      <MyChats />

      <Show breakpoint="(min-width: 520px)" sx={{ font: 'inherit' }}>
        <nav className="navigation-panel">
          <div className="options">
            <Menu>
              <MenuButton>
                <BellIcon fontSize="3xl" m={1} className="bell" />
              </MenuButton>
              {/* <MenuList></MenuList> */}
            </Menu>
            <Menu>
              <MenuButton color={'black'}>
                <Avatar size="md" cursor="pointer" name={user?.name} src={user?.picture} className="avatar" />
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
      </Show>
    </div>
  )
}

export default ChatPage
