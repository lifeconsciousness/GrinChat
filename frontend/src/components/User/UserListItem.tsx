import { Avatar } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

type Props = {
  user: any
  handleFunction: any
  chatListWidth: number | undefined
}

const UserListItem = ({ user, handleFunction, chatListWidth }: Props) => {
  const [sidebarWidth, setsidebarWidth] = useState<Number>()
  const [nameWidth, setNameWidth] = useState<Number>()
  const sidebarCutoff = 110
  const nameCutoff = -55

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
      <div className="user-pic-name">
        <Avatar size="md" name={user?.name} src={user?.picture} className="avatar" userSelect="none" />
        <div>
          <p style={{ maxWidth: `${nameWidth}px` }} className="username-in-chatlist">
            {user?.name}
          </p>
          <p style={{ opacity: 0.8, maxWidth: `${sidebarWidth}px` }} className="latest-message">
            Latest message Latest messageLatest messageLatest messageLatest messageLatest messageLatest message
          </p>
        </div>
      </div>
    </div>
  )
}

export default UserListItem
