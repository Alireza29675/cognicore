import cx from 'classnames';
import styles from './ChatMessage.module.css';
import { Message } from 'cognicore';

interface IProps {
  message: Message;
}

function ChatMessage({ message }: IProps) {
  const roleLabel = message.role.charAt(0).toUpperCase();

  if (message.role === 'tool') {
    return (
      <li className={styles.ChatMessage}>
        <span className={styles.role}>{roleLabel}</span>
        <pre>{JSON.stringify(message)}</pre>
      </li>
    );
  }

  return (
    <li className={cx(styles.ChatMessage, message.role)}>
      <span className={styles.role}>{roleLabel}</span>
      <pre>{message.content}</pre>
    </li>
  );
}

export default ChatMessage;
