import React, { useEffect } from 'react'
import { ChatState } from '../context/ChatProvider'
import { Avatar, Menu, MenuButton } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { getSender, getSenderFull } from './config/ChatLogic'
import ProfileModal from './misc/ProfileModal'
import UpdateGroupModal from './misc/UpdateGroupModal'

type Props = {
  fetchAgain: boolean
  setFetchAgain: any
}

const SingleChat = ({ fetchAgain, setFetchAgain }: Props) => {
  const { user, selectedChat, setSelectedChat, loggedUser, isSearching, selectedUser } = ChatState()

  useEffect(() => {
    console.log(selectedChat)
  }, [selectedChat])

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
            <UpdateGroupModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}>
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

          <div className="chat-messages">message</div>
          {/* chat itself */}
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
