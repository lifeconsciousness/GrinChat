import { Avatar } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { ChatState } from '../../context/ChatProvider'

type Props = {
  user: any
  handleFunction: any
  chatListWidth: number | undefined
  isSearching: boolean
}

const UserListItem = ({ user, handleFunction, chatListWidth, isSearching }: Props) => {
  const { selectedChat, setSelectedChat } = ChatState()

  const [sidebarWidth, setsidebarWidth] = useState<Number>()
  const [nameWidth, setNameWidth] = useState<Number>()
  const sidebarCutoff = screen.width <= 520 ? 500 : 145
  const nameCutoff = -160

  useEffect(() => {
    const savedWidth = Number(localStorage.getItem('chatListWidth')) - sidebarCutoff

    setsidebarWidth(savedWidth)
    setNameWidth(savedWidth - nameCutoff - sidebarCutoff)
  }, [])

  useEffect(() => {
    if (chatListWidth) {
      setsidebarWidth((chatListWidth -= sidebarCutoff))
      setNameWidth((chatListWidth -= nameCutoff + sidebarCutoff))
    }
  }, [chatListWidth])

  return (
    <div onClick={handleFunction} className="personal-chat-in-list">
      <div className="user-pic-name" style={{ width: '100%' }}>
        <Avatar
          size="md"
          name={user?.name}
          src={isSearching ? user?.users[1]?.picture : user?.picture}
          className="avatar"
          userSelect="none"
        />
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: screen.width <= 520 ? screen.width - 70 : 'unset',
            }}
          >
            <p
              style={{ maxWidth: `${screen.width <= 520 ? screen.width - 170 : nameWidth}px` }}
              className="username-in-chatlist"
            >
              {isSearching ? user?.chatName : user?.name}
            </p>
            <p style={{ opacity: 0.3, fontSize: '70%' }}>13:20</p>
          </div>
          <div style={{ display: 'flex', fontSize: '80%' }}>
            <p className="sender" style={{ opacity: 0.7 }}>
              Senderrrrrrrrrrr:
            </p>
            <p
              style={{
                opacity: 0.3,
                maxWidth: `${screen.width <= 520 ? screen.width - 130 : sidebarWidth}px`,
              }}
              className="latest-message"
            >
              Latest message Latest messageLatest messageLatest messageLatest messageLatest messageLatest message
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function useForceUpdate() {
  const [value, setValue] = useState(0) // integer state
  return () => setValue((value) => value + 1) // update state to force render
}

export default UserListItem
