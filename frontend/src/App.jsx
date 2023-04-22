import { Link, Route, Routes } from 'react-router-dom'
import './index.scss'
import LoginSignUpPage from './pages/LoginSignUpPage'
import ChatPage from './pages/ChatPage'

function App() {
  return (
    <div className="App">
      {/* <nav>
        <ul>
          <li>
            <Link to="/">Go to the login/sign up page</Link>
          </li>
          <li>
            <Link to="/chats">Go to chats</Link>
          </li>
        </ul>
      </nav> */}

      <Routes>
        <Route path="/" element={<LoginSignUpPage />} />
        <Route path="/chats" element={<ChatPage />} />
      </Routes>
    </div>
  )
}

export default App
