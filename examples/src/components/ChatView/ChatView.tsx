import ChatMessage from './ChatMessage';
import styles from './ChatView.module.css';
import { Message } from 'cognicore';

interface IProps {
  messages: Message[];
}

function ChatView({ messages }: IProps) {
  return (
    <ul className={styles.ChatView}>
      {messages.map((message, index) => {
        return <ChatMessage key={index} message={message} />
      })}
    </ul>
  );
}

export default ChatView;
