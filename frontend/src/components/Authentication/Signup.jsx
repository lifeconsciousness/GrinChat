import React, { useState } from 'react'
import { Button, InputGroup, Input, FormControl, InputRightElement, FormLabel, Center } from '@chakra-ui/react'
import { Form } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [picture, setPicture] = useState()
  const [loading, setLoading] = useState()
  const toast = useToast()
  const navigate = useNavigate()

  //variables to control the behaviour of the next button, animations
  const [show, setShow] = useState(false)
  const [isFirstInputs, setIsFirstInputs] = useState(true)
  const [firstTime, setFirstTime] = useState(true)

  //validate email format
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
        setErrorText((prevMessages) => prevMessages + `Your email is not valid.`)
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
      if (password.length < 8 || password.length > 32) {
        setErrorText(
          (prevMessages) => prevMessages + ' Password must be longer than 8 characters and shorter than 32 \n'
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

  const handlePictureUpload = (pictures) => {
    setLoading(true)
    if (pictures === undefined) {
      toast({
        title: 'Please select an image',
        description: 'Image uploaded',
        status: 'warning',
        duration: 4000,
        isClosable: true,
        position: 'bottom',
      })
      return
    }

    if (pictures.type === 'image/jpeg' || pictures.type === 'image/png') {
      const data = new FormData()
      data.append('file', pictures)
      data.append('upload_preset', 'chat-application')
      data.append('cloud_name', 'dl4iierxz')

      fetch('https://api.cloudinary.com/v1_1/dl4iierxz/image/upload', {
        method: 'POST',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPicture(data.url.toString())
          console.log(data)
          setLoading(false)
        })
        .catch((err) => {
          console.log(err)
          setLoading(false)
        })
    } else {
      toast({
        title: 'Please select an image',
        description: '',
        status: 'warning',
        duration: 4000,
        isClosable: true,
        position: 'bottom',
      })
    }
  }

  const handleSubmit = async () => {
    setErrorText('')
    if (name.length < 2 || name.length > 32) {
      setErrorText((prevMessages) => prevMessages + ' Name must be longer than 2 characters and shorter than 32 \n')
      if (!activeErrorMessage) {
        showError()
      }
    } else {
      //submit operation
      try {
        const config = {
          headers: {
            'Application-type': 'application/json',
          },
        }

        const { data } = await axios.post('/api/user', { email, password, name, picture }, config)

        localStorage.setItem('userInfo', JSON.stringify(data))
        navigate('/chats')
      } catch (err) {
        setErrorText((prevMessages) => prevMessages + `Registration error: ${err.response.data.message}`)
        if (!activeErrorMessage) {
          showError()
        }
      }
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
              <FormLabel>{loading ? 'Loading...' : 'Upload your profile photo (optional)'} </FormLabel>
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
