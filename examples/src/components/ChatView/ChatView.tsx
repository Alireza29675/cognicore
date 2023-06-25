import ChatMessage from './ChatMessage';
import styles from './ChatView.module.css';
import { Message } from 'cognicore';

interface IProps {
  messages: Message[];
}

function ChatView({ messages }: IProps) {
  return (
    <div className={styles.ChatView}>
      <ul>
        {messages.map((message, index) => {
          return <ChatMessage key={index} message={message} />
        })}
      </ul>
    </div>
  );
}

export default ChatView;
