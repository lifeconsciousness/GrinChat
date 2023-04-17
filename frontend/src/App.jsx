import { Link, Route, Routes } from 'react-router-dom'
import './App.css'
import Homepage from './pages/Homepage'
import ChatPage from './pages/ChatPage'

function App() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Go to the homepage</Link>
          </li>
          <li>
            <Link to="/chats">Go to chats</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/chats" element={<ChatPage />} />
      </Routes>
    </>
  )
}

export default App
