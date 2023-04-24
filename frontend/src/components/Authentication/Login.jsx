import React, { useState } from 'react'
import { FormControl, InputGroup, Input, InputRightElement } from '@chakra-ui/react'

function Login() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const [show, setShow] = useState(false)

  const handleShowBtn = () => {
    setShow(!show)
  }

  const handleLogin = () => {}

  return (
    <div className="signup-login-form">
      <div className="login-inputs seconary-inputs">
        <FormControl id="email-login">
          <Input
            type="email"
            name="email-input"
            placeholder="Enter your email"
            required
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />
        </FormControl>

        <FormControl id="password-login ">
          <InputGroup>
            <Input
              type={show ? 'text' : 'password'}
              name="password-input"
              placeholder="Enter your password"
              required
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
            <InputRightElement width="4.3rem">
              <button className="show-btn" onClick={handleShowBtn}>
                {show ? 'Hide' : 'Show'}
              </button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </div>

      <div className="btn-container">
        <button type="button" onClick={handleLogin}>
          Login
        </button>
        <button
          type="button"
          onClick={() => {
            setEmail('guest@example.com')
            setPassword('guestpassword123')
          }}
        >
          Log in as a guest
        </button>
      </div>
    </div>
  )
}

export default Login
