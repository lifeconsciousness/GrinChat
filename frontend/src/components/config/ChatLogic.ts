export const getSender = (loggedUser, user, isSearching) => {
  const result = !isSearching
    ? user?.name
    : user.users[0]?._id === loggedUser?._id
    ? user.users[1]?.name
    : user.users[0]?.name

  return result
}

export const getSenderFull = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1] : users[0]
}

export const isSameSender = (messages, currentMessage, index, userId) => {
  return (
    // index < messages.length - 1 &&
    // (messages[index + 1].sender._id !== currentMessage.sender._id || messages[index + 1].sender._id === undefined) &&
    // messages[index].sender._id !== userId

    index < messages.length - 1 &&
    (messages[index + 1].sender._id !== currentMessage.sender._id || messages[index + 1].sender._id === undefined)
  )
}

export const isLastMessage = (messages, index, userId) => {
  return (
    // index === messages.length - 1 &&
    // messages[messages.length - 1].sender._id !== userId &&
    // messages[messages.length - 1].sender._id

    index === messages.length - 1 && messages[messages.length - 1].sender._id
  )
}
