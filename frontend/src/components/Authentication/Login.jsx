import React, { useState } from 'react'
import { Stack, HStack, VStack, FormControl, FormLabel } from '@chakra-ui/react'

function Login() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  return (
    <VStack spacing="5px">
      <FormControl>
        <FormLabel></FormLabel>
        {/* <Input placeholder='Enter your name' onChange={() => } /> */}
      </FormControl>
    </VStack>
  )
}

export default Login
