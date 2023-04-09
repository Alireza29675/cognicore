import { v4 as uuid } from 'uuid';
import Chat from './Chat';

class User {
  protected chat: Chat;
  id: string;
  role: 'user' | 'assistant';

  constructor(chat: Chat, role: 'user' | 'assistant' = 'user') {
    // Assigns the chat parameter to the protected chat property and stores the role in the role property
    this.chat = chat;
    // Generates a unique ID for the user by combining the role and a UUID
    this.id = role + '-' + uuid();
    this.role = role;
  }

  // Writes a message to the chat with the user's role, content, and name
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
