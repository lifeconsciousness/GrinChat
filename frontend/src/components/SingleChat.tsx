import React, { useEffect, useRef, useState } from 'react'
import { ChatState } from '../context/ChatProvider'
import { Avatar, Box, FormControl, Input, Menu, MenuButton, Spinner, useToast } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { getSender, getSenderFull } from './config/ChatLogic'
import ProfileModal from './misc/ProfileModal'
import UpdateGroupModal from './misc/UpdateGroupModal'
import axios from 'axios'
import SendIcon from '/images/send.png'
import ScrollableChat from './ScrollableChat'
import io from 'socket.io-client'

type Props = {
  fetchAgain: boolean
  setFetchAgain: any
}

type Message = {}

// const ENDPOINT = 'http://localhost:5173'; // Changed to backend port
const ENDPOINT = 'https://grinchat-8yvp.onrender.com'; // Changed to backend port
const socket = io(ENDPOINT);
let selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }: Props) => {
  const { user, setUser, selectedChat, setSelectedChat, loggedUser, isSearching, selectedUser } = ChatState()
  const toast = useToast()

  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [newMessage, setNewMessage] = useState('')
  const [socketConnected, setSocketConnected] = useState(false)
  const [hasScrollbar, setHasScrollbar] = useState(false)

  useEffect(() => {
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    const userInfoString = localStorage.getItem('userInfo');
    let userFromStorage = userInfoString ? JSON.parse(userInfoString) : null;

    socket.emit('setup', userFromStorage);
    socket.on('connected', () => setSocketConnected(true));

    return () => {
      socket.off('connected');
    };
  }, []);

  useEffect(() => {
    const handleMessageReceived = (newMessageReceived) => {
      if (!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id) {
        // Handle notification
      } else {
        setMessages(prevMessages => [...prevMessages, newMessageReceived]);
      }
    };

    socket.on('message received', handleMessageReceived);

    return () => {
      socket.off('message received', handleMessageReceived);
    };
  }, [selectedChat]);

  useEffect(() => {
    fetchMessages()
  }, [selectedChat])

  const fetchMessages = async () => {
    if (!selectedChat) return

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }

      setLoading(true)
      const { data } = await axios.get(`/api/message/${selectedChat._id}`, config)

      setMessages(data)
      console.log(messages)
      setLoading(false)

      socket.emit('join chat', selectedChat._id)
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

  const sendMessage = async (e) => {
    if (e.key === 'Enter' || (e.type === 'click' && newMessage)) {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        };

        const { data } = await axios.post(
          '/api/message',
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );

        socket.emit('new message', data);
        setMessages(prevMessages => [...prevMessages, data]);
        setNewMessage('');
        setFetchAgain(!fetchAgain);
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
  }

  const typingHandler = (e) => {
    setNewMessage(e.target.value)
  }

  const hasScrollBar = (element) => {
    if (element) {
      const { scrollTop } = element

      if (scrollTop > 0) {
        return true
      }

      element.scrollTop += 10

      if (scrollTop === element.scrollTop) {
        return false
      }

      // undoing the change
      element.scrollTop = scrollTop
      return true
    }
  }

  return (
    <>
      {selectedChat ? (
        <div className="single-chat-container">
          {!selectedChat.isGroupChat ? (
            <ProfileModal user={getSenderFull(user, selectedChat.users)}>
              <div className="chat-top-panel" style={{ cursor: 'pointer' }}>
                {screen.width <= 520 && selectedChat ? (
                  <Menu>
                    <MenuButton
                      left={2}
                      top={2}
                      position="absolute"
                      onClick={() => {
                        setSelectedChat('')
                      }}
                    >
                      <ArrowBackIcon fontSize="4xl" />
                    </MenuButton>
                  </Menu>
                ) : (
                  ''
                )}

                <p className="username-group-add" style={{ maxWidth: window.innerWidth / 2 - 30, fontSize: '85%' }}>
                  {selectedChat.isGroupChat ? selectedChat.chatName : selectedChat.users[1].name}
                </p>
              </div>
            </ProfileModal>
          ) : (
            <UpdateGroupModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} fetchMessages={fetchMessages}>
              <div className="chat-top-panel" style={{ cursor: 'pointer' }}>
                {screen.width <= 520 && selectedChat ? (
                  <Menu>
                    <MenuButton
                      left={2}
                      top={2}
                      position="absolute"
                      onClick={() => {
                        setSelectedChat('')
                      }}
                    >
                      <ArrowBackIcon fontSize="4xl" />
                    </MenuButton>
                  </Menu>
                ) : (
                  ''
                )}

                <p className="username-group-add" style={{ maxWidth: window.innerWidth / 2 - 30, fontSize: '85%' }}>
                  {selectedChat.isGroupChat ? selectedChat.chatName : selectedChat.users[1].name}
                </p>
              </div>
            </UpdateGroupModal>
          )}

          <div className="messages-and-send">
            {loading ? (
              <Box width="100%" height="80vh" display="flex">
                <Spinner alignSelf="center" margin="auto" />
              </Box>
            ) : (
              <div className="messages" style={{ paddingTop: `${hasScrollbar ? '0' : '10px'}` }}>
                {<ScrollableChat messages={messages} />}
              </div>
            )}

            <FormControl
              className="input-and-send"
              onKeyDown={sendMessage}
              isRequired
              marginBottom={2}
              paddingRight="10px"
              paddingLeft="11px"
            >
              <Input
                borderRadius={0}
                onChange={typingHandler}
                value={newMessage}
                autoComplete="off"
                inputMode="text"
              ></Input>
              <img className="send-icon" src={SendIcon} alt="send" onClick={sendMessage} />
            </FormControl>
          </div>
        </div>
      ) : (
        <p
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: window.innerHeight - 30,
            width: '100%',
            textAlign: 'center',
            fontSize: '90%',
          }}
        >
          Select or find a chat to start messaging
        </p>
      )}
    </>
  )
}

export default SingleChat
