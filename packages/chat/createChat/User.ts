import { v4 as uuid } from 'uuid';
import Chat from './Chat';

class User {
  protected chat: Chat;
  id: string;
  role: 'user' | 'assistant';

  constructor(chat: Chat, role: 'user' | 'assistant' = 'user') {
    this.chat = chat;
    this.id = role + '-' + uuid();
    this.role = role;
  }

  write(message: string): User {
    this.chat.messages.push({
      role: this.role,
      content: message,
      name: this.id,
    });

    return this;
  }
}

export default User;
