import styles from './ChatMessage.module.css';
import { Message } from 'cognicore';

interface IProps {
  message: Message;
}

function ChatMessage({ message }: IProps) {
  if (message.role === 'tool') {
    return (
      <li className={styles.ChatMessage}>
        <span className={styles.role}>{message.role}:</span>
        <pre>{JSON.stringify(message)}</pre>
      </li>
    );
  }

  return (
    <li className={styles.ChatMessage}>
      <span className={styles.role}>{message.role}:</span>
      <p>{message.content}</p>
    </li>
  );
}

export default ChatMessage;
