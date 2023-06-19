import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from '@chakra-ui/react'
import Login from '../components/Authentication/Login'
import Signup from '../components/Authentication/Signup'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Homepage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))

    if (userInfo) {
      navigate('/chats')
    }
  }, [navigate])

  return (
    <div className="login-page">
      <div className="logo-text">
        <span>GrinChat</span> <span className="grin">&#40;:</span>
      </div>

      <div className="main-container">
        <div className="login-signup">
          <Tabs
            position="relative"
            variant="unstyled"
            isFitted
            defaultIndex={localStorage.getItem('isSignedUp') === 'true' ? 1 : 0}
          >
            <TabList>
              <Tab>Sign up</Tab>
              <Tab>Login</Tab>
            </TabList>
            <TabIndicator mt="-1.5px" height="2px" borderRadius="1px" className="tab-indicator" />
            <TabPanels>
              <TabPanel>
                <Signup></Signup>
              </TabPanel>
              <TabPanel>
                <Login></Login>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default Homepage
