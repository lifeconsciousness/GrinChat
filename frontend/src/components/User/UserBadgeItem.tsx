import { CloseIcon } from '@chakra-ui/icons'
import { Box } from '@chakra-ui/react'
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
    >
      <p className="username-group-add">{user.name}</p>
      <CloseIcon />
    </Box>
  )
}

export default UserBadgeItem
