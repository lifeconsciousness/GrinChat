import React, { useState } from 'react'
import { Button, InputGroup, Input, FormControl, InputRightElement, FormLabel, Center } from '@chakra-ui/react'
import { Form } from 'react-router-dom'

function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [picture, setPicture] = useState()

  const [show, setShow] = useState(false)
  const [isFirstInputs, setIsFirstInputs] = useState(true)
  const [firstTime, setFirstTime] = useState(true)

  // use a regular expression to validate email format
  const isValidEmail = (email) => {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  //password show
  const handleShowBtn = () => {
    setShow(!show)
  }

  const [errorText, setErrorText] = useState('')
  const [activeErrorMessage, setActiveErrorMessage] = useState(false)

  const showError = () => {
    setActiveErrorMessage(true)

    setTimeout(() => {
      setActiveErrorMessage(false)
    }, 4000)
  }

  const handleNextBtn = () => {
    setErrorText('')

    if (isFirstInputs) {
      if (!isValidEmail(email)) {
        setErrorText((prevMessages) => prevMessages + `Your mail is not valid.`)
        if (!activeErrorMessage) {
          showError()
        }
      }
      if (password !== confirmPassword) {
        setErrorText((prevMessages) => prevMessages + ' Password and confirm password do not match. \n')
        if (!activeErrorMessage) {
          showError()
        }
      }
      if (password.length < 8 || password.length > 64) {
        setErrorText(
          (prevMessages) => prevMessages + ' Password must be longer than 8 characters and shorter than 64 \n'
        )
        if (!activeErrorMessage) {
          showError()
        }
      }
      if (password === confirmPassword && password !== '' && password.length > 8 && isValidEmail(email)) {
        setIsFirstInputs(!isFirstInputs)
      }
    } else if (!isFirstInputs) {
      setIsFirstInputs(!isFirstInputs)
      setFirstTime(false)
    }
  }

  const handlePictureUpload = (pictures) => {}

  const handleSubmit = () => {
    setErrorText('')
    if (name.length < 1 || name.length > 32) {
      setErrorText((prevMessages) => prevMessages + ' Name must be longer than 8 characters and shorter than 32 \n')
      if (!activeErrorMessage) {
        showError()
      }
    } else {
      //submit operation
      console.log(email, password, name)
    }
  }

  return (
    <div className="signup-login-form">
      {isFirstInputs ? (
        <>
          <FormControl id="email" className={firstTime ? '' : 'first-inputs'}>
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

          <FormControl id="password" className={firstTime ? '' : 'first-inputs'}>
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

          <FormControl id="confirmPassword" className={firstTime ? '' : 'first-inputs'}>
            <Input
              type={show ? 'text' : 'password'}
              name="confirm-password-input"
              placeholder="Confirm your password"
              required
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value)
              }}
            />
          </FormControl>
        </>
      ) : (
        <>
          <FormControl id="name" className="seconary-inputs">
            <Input
              type="text"
              name="name-input"
              placeholder="Enter your name"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value)
              }}
            />
          </FormControl>

          <FormControl id="picture" className="seconary-inputs">
            <Center>
              <FormLabel>Upload your profile photo (optional)</FormLabel>
            </Center>
            <Center>
              <Input
                type="file"
                variant="unstyled"
                className="picture-input"
                name="file-input"
                accept="image/*"
                onChange={(e) => {
                  handlePictureUpload(e.target.files[0])
                }}
              />
            </Center>
          </FormControl>
        </>
      )}

      <div className="btn-container">
        <button type="button" onClick={handleNextBtn}>
          {isFirstInputs ? 'Next' : 'Back'}
        </button>
        {!isFirstInputs ? <button onClick={handleSubmit}>Submit</button> : ''}
      </div>

      <div className={activeErrorMessage ? 'popup-message popup-animation' : 'popup-message'}>
        <p>{errorText}</p>
      </div>
    </div>
  )
}

export default Signup
