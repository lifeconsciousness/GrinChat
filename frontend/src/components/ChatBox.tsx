import React from 'react'
import { ChatState } from '../context/ChatProvider'
import SingleChat from './SingleChat'

type Props = {
  fetchAgain: boolean
  setFetchAgain: any
}

function ChatBox({ fetchAgain, setFetchAgain }: Props) {
  const { selectedChat } = ChatState()

  return (
    <div className={`chat-box ${window.innerWidth < 520 ? 'chat-box-anim' : ''}`}>
      {<SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
    </div>
  )
}

export default ChatBox
