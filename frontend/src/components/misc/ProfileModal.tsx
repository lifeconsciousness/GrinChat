import { Avatar, Button, Divider, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

type Props = {
  user: any
  children: any
}

const ProfileModal = ({ user, children }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      {children ? <span onClick={onOpen}>{children}</span> : <button onClick={onOpen}>Show profile</button>}

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent maxH="409px" maxW="350px" className="modal-window">
          <ModalHeader>User info</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="user-pic-name">
              <Avatar
                size="lg"
                cursor="pointer"
                name={user?.name}
                src={user?.picture}
                className="avatar"
                userSelect="none"
              />
              <div>
                <h3>{user?.name}</h3>
                <h4 style={{ opacity: 0.8 }}>Last seen: ?</h4>
              </div>
            </div>
            <Divider margin="13px 0" />
            <h4>Your email: {user?.email}</h4>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ProfileModal
