import Assistant from './Assistant';
import Usage from './Usage';
import User from './User';
import { TChatOptions, TMessage } from './types';
import getLatestMessagesOfChat from './utils/getLatestMessagesOfChat';

class Chat {
  readonly instructions;
  readonly messages: TMessage[] = [];
  readonly maxMessagesPerRequest = 10;

  options: TChatOptions = {
    model: 'gpt-3.5-turbo',
    max_tokens: 100,
  };

  usage = new Usage(this);
  user = new User(this);
  assistant = new Assistant(this);

  constructor(instructions: string, options: Partial<TChatOptions> = {}) {
    this.instructions = instructions;
    this.options = {
      ...this.options,
      ...options,
    };
  }

  get latestMessages(): TMessage[] {
    return getLatestMessagesOfChat(this);
  }
}

export default Chat;
