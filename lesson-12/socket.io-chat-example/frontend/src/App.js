import { useCallback, useEffect, useState } from "react";
import { nanoid } from 'nanoid'
import io from 'socket.io-client'

import SigninChatForm from "./components/SigninChatForm/SigninChatForm";
import ChatForm from "./components/ChatForm/ChatForm";
import Chat from "./components/Chat/Chat";

import './App.css';
const socket = io.connect('http://localhost:5001')

function App() {
  const [nickname, setNickname] = useState('')
  const [messages, setMessages] = useState([])

  const addNickname = useCallback(({ name }) => setNickname(name), [])

  const addMessage = useCallback(({ message }) => {
    setMessages(prevMessages => {
      if (!prevMessages) {
        prevMessages = []
      }
      const newMessage = {
        id: nanoid(),
        type: 'you',
        message,
      }

      return [...prevMessages, newMessage]
    })
    socket.emit('chat-message', message)
  }, [])

  useEffect(() => {
    socket.on('chat-message', message => {
      setMessages(prevMessages => {
        const newMessage = {
          id: nanoid(),
          type: 'user',
          message,
        }

        return [...prevMessages, newMessage]
      })
    })

    socket.on('user-disconected', message => {
      setMessages(prevMessages => {
        const newMessage = {
          id: nanoid(),
          type: 'user',
          message: `User has been disconected`,
        }

        return [...prevMessages, newMessage]
      })
    })
  }, [])


  return (
    <div className="App">
      {!nickname && <SigninChatForm onSubmit={addNickname} />}
      {nickname && <ChatForm onSubmit={addMessage} />}
      {nickname && < Chat items={messages} />}
    </div>
  )
}

export default App;
