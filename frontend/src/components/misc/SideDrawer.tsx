import React from 'react'
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
import { BellIcon, HamburgerIcon } from '@chakra-ui/icons'
import ProfileModal from './ProfileModal'
import useLogout from '../Authentication/Logout'

type Props = {
  user: any
}

const SideDrawer = ({ user }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const logout = useLogout()

  return (
    <>
      {!isOpen ? <HamburgerIcon onClick={onOpen} cursor="pointer" fontSize="4xl" className="burger-icon" /> : ''}

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent className="drawer">
          <DrawerBody className="drawer-body" marginTop="1em" marginBottom="1.2em">
            <div className="avatar-and-name">
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

              <div className="name-and-bell">
                <h2>{user?.name}</h2>

                <Menu>
                  <MenuButton>
                    <BellIcon fontSize="3xl" m={1} className="bell" />
                  </MenuButton>
                  <MenuList></MenuList>
                </Menu>
              </div>
            </div>

            <Divider marginBottom="10px" />

            <p>Some contents...</p>
            <p>Some contents...</p>

            <div className="logout-and-rest">
              <p>Some contents...</p>
              <button className="logout-drawer" onClick={logout}>
                Log out
              </button>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default SideDrawer
