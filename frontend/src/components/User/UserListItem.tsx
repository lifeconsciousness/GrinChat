import React from 'react'

type Props = {
  user: any
  handleFunction: any
}

const UserListItem = ({ user, handleFunction }: Props) => {
  return <div onClick={handleFunction}>{user.name}</div>
}

export default UserListItem
