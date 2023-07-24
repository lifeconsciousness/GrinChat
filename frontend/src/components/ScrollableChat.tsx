import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { isLastMessage, isSameSender } from './config/ChatLogic'
import { ChatState } from '../context/ChatProvider'
import { Avatar } from '@chakra-ui/react'

type Props = {
  messages: any
}

const ScrollableChat = ({ messages }: Props) => {
  const { user } = ChatState()

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((message, index) => (
          <div
            style={{ display: 'flex', marginBottom: `${isSameSender(messages, message, index, user._id) && '3px'}` }}
            key={message._id}
          >
            {(isSameSender(messages, message, index, user._id) || isLastMessage(messages, index, user._id)) && (
              <Avatar
                size="sm"
                cursor="pointer"
                name={message.sender.name}
                src={message.sender.picture}
                className="avatar"
                userSelect="none"
              />
            )}

            <span
              className="message"
              style={{
                backgroundColor: `${message.sender._id === user._id ? 'rgb(53, 51, 51)' : 'rgb(109, 104, 104)'}`,
                marginLeft: `${
                  isSameSender(messages, message, index, user._id) || isLastMessage(messages, index, user._id)
                    ? '5px'
                    : '37px'
                }`,
              }}
            >
              {message.content}
              <span style={{ opacity: '0.3', fontSize: '54%', alignSelf: 'flex-end' }}>
                {message.createdAt.slice(11, 16)}
              </span>
            </span>
          </div>
        ))}
    </ScrollableFeed>
  )
}

export default ScrollableChat
