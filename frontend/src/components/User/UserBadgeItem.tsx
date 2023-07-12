import { CloseIcon } from '@chakra-ui/icons'
import { Avatar, Box } from '@chakra-ui/react'
import React from 'react'

type Props = {
  user: any
  handleFunction: any
}

const UserBadgeItem = ({ user, handleFunction }: Props) => {
  return (
    <Box
      px={2}
      py={1}
      borderEndRadius="lg"
      m={1}
      mb={1}
      fontSize={12}
      cursor="pointer"
      onClick={handleFunction}
      border="1px solid black"
      borderRadius="50px"
      width="fit-content"
      height="fit-content"
      display="flex"
      alignItems="center"
      gap="5px"
      paddingTop="2px"
      paddingBottom="2px"
      paddingLeft="2px"
    >
      <Avatar size="sm" name={user?.name} src={user?.picture} className="avatar" userSelect="none" />
      <p className="username-group-add">{user.name}</p>
      <CloseIcon className="user-badge-close-icon" />
    </Box>
  )
}

export default UserBadgeItem
