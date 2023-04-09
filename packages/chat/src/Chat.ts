import Assistant from './Assistant';
import Usage from './Usage';
import User from './User';
import { TChatOptions, TMessage } from './types';
import getLatestMessagesOfChat from './utils/getLatestMessagesOfChat';

class Chat {
  // System prompt of the chat
  readonly instructions: string;
  // Messages sent in the chat
  readonly messages: TMessage[] = [];
  // Maximum messages allowed in a request
  readonly maxMessagesPerRequest = 10;
  // Options for the chat
  options: TChatOptions = {
    model: 'gpt-3.5-turbo',
    max_tokens: 100,
  };

  // Instance of the Usage class
  usage = new Usage(this);

  // Instance of the User class
  user = new User(this);
  // Instance of the Assistant class
  assistant = new Assistant(this);

  // Constructor for the Chat class
  constructor(instructions: string, options: Partial<TChatOptions> = {}) {
    this.instructions = instructions;
    this.options = {
      ...this.options,
      ...options,
    };
  }

  // Get the latest messages in the chat
  get latestMessages(): TMessage[] {
    return getLatestMessagesOfChat(this);
  }
}

export default Chat;
