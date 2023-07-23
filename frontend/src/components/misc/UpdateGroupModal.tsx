import { ViewIcon } from '@chakra-ui/icons'
import {
  Avatar,
  Button,
  Divider,
  FormControl,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { ChatState } from '../../context/ChatProvider'
import UserBadgeItem from '../User/UserBadgeItem'
import axios from 'axios'
import UserListItemSearch from '../User/UserListItemSearch'

type Props = {
  children: any
  fetchAgain: boolean
  setFetchAgain: any
  fetchMessages: any
}

interface User {
  _id: string
}

const UpdateGroupModal = ({ children, fetchAgain, setFetchAgain, fetchMessages }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [groupChatName, setGroupChatName] = useState('')
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [renameLoading, setRenameLoading] = useState(false)

  const toast = useToast()

  const { selectedChat, setSelectedChat, user } = ChatState()

  const handleRename = async () => {
    if (!groupChatName || groupChatName.length > 32 || groupChatName.length < 2) {
      toast({
        title: '',
        description: 'Chat name must be between 2 and 32 characters',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'bottom',
      })

      return
    }

    try {
      setRenameLoading(true)

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }

      const { data } = await axios.put(
        '/api/chats/rename',
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      )

      setSelectedChat(data)
      setFetchAgain(!fetchAgain)
      setRenameLoading(false)
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response.data.message,
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'bottom',
      })
      setRenameLoading(false)
    }

    setGroupChatName('')
  }

  const handleRemove = async (user1) => {
    if (selectedChat.groupAdmin._id !== user._id) {
      toast({
        title: 'Only admin can add new users',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'bottom',
      })
      return
    }

    try {
      setLoading(true)

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }

      const { data } = await axios.put(
        '/api/chat/groupremove',
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      )

      user1._id === user._id ? setSelectedChat() : setSelectedChat(data)
      setFetchAgain(!fetchAgain)
      fetchMessages()
      setLoading(false)
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response.data.message,
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'bottom',
      })
    }
  }

  const handleSearch = async (query) => {
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

      setLoading(false)
      setSearchResult(data)
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response.data.message,
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'bottom',
      })
    }
  }

  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      toast({
        title: 'User already in the group',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'bottom',
      })
      return
    }

    // if (selectedChat.groupAdmin._id !== user._id) {
    //   toast({
    //     title: 'Only admin can add new users',
    //     status: 'error',
    //     duration: 2000,
    //     isClosable: true,
    //     position: 'bottom',
    //   })
    //   return
    // }

    try {
      setLoading(true)

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }

      const { data } = await axios.put(
        '/api/chats/groupadd',
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      )

      setSelectedChat(data)
      setFetchAgain(!fetchAgain)
      setLoading(false)
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response.data.message,
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'bottom',
      })
    }
  }

  const handleDelete = (userToDelete) => {
    console.log(userToDelete)
    // setSelectedUsers(selectedUsers.filter((user) => user._id !== userToDelete._id))
  }

  return (
    <>
      {children ? <span onClick={onOpen}>{children}</span> : <button onClick={onOpen}>Show profile</button>}

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent maxH="600px" maxW="350px">
          <ModalHeader>{selectedChat.chatName}</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <FormControl display="flex">
              <Input
                placeholder="Edit chat name"
                marginBottom="7px"
                h={8}
                fontSize={15}
                border="1px solid rgb(25, 22, 36)"
                borderRadius={0}
                _hover={{ borderColor: 'rgb(25, 22, 36)' }}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <button type="submit" className="apply-button" onClick={handleRename}>
                Apply
              </button>
            </FormControl>

            <Tabs position="relative" variant="unstyled" isFitted>
              <TabList>
                <Tab>Members</Tab>
                <Tab>Add new</Tab>
              </TabList>
              <TabIndicator mt="-1.5px" height="2px" bg="black" borderRadius="1px" />
              <TabPanels>
                <TabPanel padding="10px 0">
                  <div
                    className="selected-users-group-chat"
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      height: '100%',
                      maxHeight: '300px',
                      borderBottom: '1px solid black',
                    }}
                  >
                    {selectedChat.users.map((user) => (
                      <UserBadgeItem
                        key={user._id}
                        user={user}
                        handleFunction={() => {
                          handleRemove(user)
                        }}
                      />
                    ))}
                  </div>
                </TabPanel>
                <TabPanel padding="10px 0">
                  <FormControl>
                    <Input
                      placeholder="Add new user"
                      marginBottom="5px"
                      h={8}
                      fontSize={15}
                      border="1px solid rgb(25, 22, 36)"
                      borderRadius={0}
                      _hover={{ borderColor: 'rgb(25, 22, 36)' }}
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                  </FormControl>

                  <div
                    className="selected-users-group-chat"
                    style={{ display: 'flex', flexWrap: 'wrap', maxHeight: '85px' }}
                  >
                    {search.length === 0 ? (
                      <p style={{ paddingLeft: '10px' }}>No added users yet</p>
                    ) : (
                      searchResult.map((user) => (
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
                        <div className="user-list" style={{ maxHeight: '170px' }}>
                          {searchResult?.map((user) => (
                            <UserListItemSearch
                              key={user._id}
                              user={user}
                              handleFunction={() => {
                                handleAddUser(user)
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
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>

          {/* <div className="selected-users-group-chat" style={{ display: 'flex', flexWrap: 'wrap' }}>
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
          </div> */}

          <ModalFooter>
            <Button onClick={() => handleRemove(user)} colorScheme="red" size="sm" fontWeight={400}>
              Leave group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default UpdateGroupModal
