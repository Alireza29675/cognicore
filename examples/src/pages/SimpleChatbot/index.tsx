import { Chat } from "cognicore";
import { useEffect, useRef, useState } from "react";

export const metadata = {
  title: 'Simple Chatbot',
  route: 'simple-chatbot',
}

type Messages = typeof Chat.prototype.messages;

export default function SimpleChatbot() {
  const chat = useRef<Chat>(new Chat());
  const [messages, setMessages] = useState<Messages>([]);

  useEffect(() => {
    chat.current.call('Hello World').then(() => {
      setMessages(chat.current.messages);
    });
  }, []);

  return (
    <div>
      <h1>SimpleChatbot</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message.role}</li>
        ))}
      </ul>
    </div>
  )
}