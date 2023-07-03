import React from 'react'
import { ChatState } from '../context/ChatProvider'
import { Menu, MenuButton } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { getSender } from './config/ChatLogic'

type Props = {
  fetchAgain: boolean
  setFetchAgain: any
}

const SingleChat = ({ fetchAgain, setFetchAgain }: Props) => {
  const { user, selectedChat, setSelectedChat, loggedUser, isSearching } = ChatState()

  return (
    <>
      {selectedChat ? (
        <div className="single-chat-container">
          <div className="chat-top-panel">
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
          </div>
          {!user?.isGroupChat ? getSender(loggedUser, user, isSearching) : user?.chatName}
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
