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
import ProfileModal from '../components/misc/ProfileModal'
import useLogout from '../components/Authentication/Logout'

const ChatPage = () => {
  const { user } = ChatState()
  const logout = useLogout()
  const forceUpdate = useForceUpdate()

  useEffect(() => {
    // const handleResize = () => {
    //   location.reload()
    // }

    window.addEventListener('resize', forceUpdate)

    return () => {
      window.removeEventListener('resize', forceUpdate)
    }
  }, [])

  return (
    <div className="chats-page">
      <MyChats />

      {/* <Show breakpoint="(min-width: 520px)" sx={{ font: 'inherit' }}></Show> */}

      <nav className="navigation-panel">
        <div className="options">
          <Menu>
            <MenuButton>
              <BellIcon fontSize="3xl" m={1} className="bell" userSelect="none" />
            </MenuButton>
            {/* <MenuList></MenuList> */}
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
        </div>

        <ChatBox />
      </nav>
    </div>
  )
}

function useForceUpdate() {
  const [value, setValue] = useState(0) // integer state
  return () => setValue((value) => value + 1) // update state to force render
}

export default ChatPage
