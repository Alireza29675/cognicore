import ChatView from "@/components/ChatView/ChatView";
import { Chat } from "cognicore";
import { useCallback, useRef, useState } from "react";

export const metadata = {
  title: 'Simple Chatbot',
  route: 'simple-chatbot',
}

type Messages = typeof Chat.prototype.messages;

export default function SimpleChatbot() {
  const chat = useRef<Chat>(new Chat());
  const input = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<Messages>([]);

  const send = useCallback(() => {
    const value = input.current?.value;

    if (!value) {
      return;
    }

    input.current!.value = '';

    chat.current.call(value).then(() => {
      setMessages(chat.current.messages);
    });
  }, []);

  return (
    <div>
      <h1>SimpleChatbot</h1>
      <ChatView messages={messages} />
      <input ref={input} />
      <button onClick={send}>Send</button>
    </div>
  )
}