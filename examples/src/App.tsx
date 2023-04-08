import { createChat, setOpenAIKey } from 'gptkit'
import { useCallback, useState } from 'react';

const chat = createChat(`
  From now on, you're a wizard, named Harry. You can do magic. You talk short and mysteriously.
  Give answers to the questions. Don't introduce yourself as AI.
`);

function App() {
  const [messages, setMessages] = useState(chat.messages);
  const [chatbox, setChatbox] = useState('');

  const setKey = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setOpenAIKey(e.target.value);
  }, []);

  const send = useCallback(() => {
    chat.user.write(chatbox);
    setMessages([...chat.messages]);
    chat.assistant.generate().then(() => {
      setMessages([...chat.messages]);
    });
  }, [chatbox]);

  return (
    <div className="App">
      API Key: <input type="text" onChange={setKey} />

      <div>
        Talk to Harry: <input type="text" value={chatbox} onChange={(e) => setChatbox(e.target.value)} />
        <button onClick={send}>Send</button>
      </div>

      <ul>
        {messages.map((message, i) => (
          <li key={i}>
            <strong>{message.role}</strong>: {message.content}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
