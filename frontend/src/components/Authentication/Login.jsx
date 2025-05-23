import React, { useState, useEffect } from 'react'
import { FormControl, InputGroup, Input, InputRightElement } from '@chakra-ui/react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import ErrorDisplay from './ErrorDisplay'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isGuestLogin, setIsGuestLogin] = useState(false)
  const navigate = useNavigate()

  //show password button
  const [show, setShow] = useState(false)
  const handleShowBtn = () => {
    setShow(!show)
  }

  //error handling
  const [errorMessage, setErrorMessage] = useState('')
  const [counter, setCounter] = useState(0)

  const sendErrorText = (text) => {
    setErrorMessage((prevMessages) => prevMessages + text)
    setCounter(counter + 1)
  }

  //handle click on login button
  const handleLogin = async () => {
    try {
      const config = {
        headers: {
          'Application-type': 'application/json',
        },
      }

      //login api request
      const { data } = await axios.post('/api/user/login', { email, password }, config)

      localStorage.setItem('userInfo', JSON.stringify(data))
      localStorage.setItem('isSignedUp', 'true')

      navigate('/chats')
    } catch (err) {
      sendErrorText(err.response.data.message)
    }
  }

  useEffect(() => {
    if (isGuestLogin && email === 'guest@email.com' && password === 'guestpassword123') {
      handleLogin()
      setIsGuestLogin(false)
    }
  }, [email, password, isGuestLogin])

  return (
    <div className="signup-login-form">
      <div className="login-inputs seconary-inputs">
        <FormControl id="email-login">
          <Input
            type="email"
            name="email-input"
            placeholder="Enter your email"
            required
            value={email}
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
              value={password}
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
          Log in
        </button>
        <button
          type="button"
          onClick={() => {
            setIsGuestLogin(true)
            setEmail('guest@email.com')
            setPassword('guestpassword123')
          }}
        >
          Guest account
        </button>
      </div>

      <>{counter === 0 ? '' : <ErrorDisplay errMessage={errorMessage} rerender={counter} />}</>
    </div>
  )
}

export default Login
