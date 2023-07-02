import {
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import ErrorDisplay from '../Authentication/ErrorDisplay'
import { ChatState } from '../../context/ChatProvider'
import axios from 'axios'
import UserListItemSearch from '../User/UserListItemSearch'
import UserBadgeItem from '../User/UserBadgeItem'

type Props = {
  children: any
}

interface User {
  _id: string
}

const GroupChatModal = ({ children }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [groupChatName, setGroupChatName] = useState('')
  const [selectedUsers, setSelectedUsers] = useState<User[]>([])
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState<User[]>([])
  const [loading, setLoading] = useState(false)

  const { user, chats, setChats } = ChatState()

  const toast = useToast()

  //search of users that you already have a chat with
  const handleSearch = async (query: string) => {
    setSearch(query)
    if (!query) {
      return
    }

    try {
      setLoading(true)

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }

      const { data } = await axios.get(`/api/user?search=${search}`, config)

      console.log(data)
      setLoading(false)
      setSearchResult(data)
    } catch (error) {}
  }

  const fetchChats = async () => {
    try {
      setLoading(true)

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }

      const { data } = await axios.get(`/api/chats`, config)

      // setChats(data)
      setSearchResult(data)
      setLoading(false)
    } catch (error) {
      toast({
        title: '',
        description: 'Failed to load chats',
        status: 'error',
        duration: 1300,
        isClosable: true,
      })
    }
  }

  useEffect(() => {
    console.log(chats)

    const userInfo = localStorage.getItem('userInfo')
    if (userInfo) {
      fetchChats()
    }
  }, [])

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      toast({
        title: '',
        description: 'Please fill in all the fields',
        status: 'warning',
        duration: 1300,
        isClosable: true,
      })
      return
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }

      const { data } = await axios.post(
        '/api/chats/group',
        {
          chatName: groupChatName,
          users: JSON.stringify(selectedUsers.map((user) => user._id)),
        },
        config
      )

      setChats([data, ...chats])
      onClose()
    } catch (error) {
      console.log(error)

      toast({
        title: '',
        description: 'Failed to create the chat',
        status: 'error',
        duration: 1300,
        isClosable: true,
      })
    }
  }

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast({
        title: '',
        description: 'User is already added',
        status: 'warning',
        duration: 1300,
        isClosable: true,
      })
      return
    }

    setSelectedUsers([...selectedUsers, userToAdd])
  }

  const handleDelete = (userToDelete) => {
    console.log(userToDelete)
    setSelectedUsers(selectedUsers.filter((user) => user._id !== userToDelete._id))
  }

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent height="100%" maxH="500px" maxW="350px" className="modal-window">
          <ModalHeader fontSize={16}>New group chat</ModalHeader>
          <ModalCloseButton />

          <ModalBody className="group-modal-body">
            <FormControl>
              <Input
                placeholder="Chat name"
                marginBottom="7px"
                h={8}
                fontSize={15}
                border="1px solid rgb(25, 22, 36)"
                borderRadius={0}
                _hover={{ borderColor: 'rgb(25, 22, 36)' }}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Search"
                marginBottom="5px"
                h={8}
                fontSize={15}
                border="1px solid rgb(25, 22, 36)"
                borderRadius={0}
                _hover={{ borderColor: 'rgb(25, 22, 36)' }}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>

            <div className="selected-users-group-chat" style={{ display: 'flex', flexWrap: 'wrap' }}>
              {selectedUsers.length === 0 ? (
                <p style={{ paddingLeft: '10px' }}>No added users yet</p>
              ) : (
                selectedUsers.map((user) => (
                  <UserBadgeItem
                    key={user._id}
                    user={user}
                    handleFunction={() => {
                      handleDelete(user)
                    }}
                  />
                ))
              )}
            </div>

            <div className="user-list-container">
              {search.length >= 1 ? (
                loading ? (
                  <div>Loading...</div>
                ) : (
                  <div className="user-list">
                    {searchResult?.map((user) => (
                      <UserListItemSearch
                        key={user._id}
                        user={user}
                        handleFunction={() => {
                          handleGroup(user)
                        }}
                        isSearching={false}
                      />
                    ))}
                  </div>
                )
              ) : (
                ''
              )}
            </div>
          </ModalBody>

          <ModalFooter>
            <button className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button className="create-group-btn" onClick={handleSubmit}>
              Create
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default GroupChatModal
