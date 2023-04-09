import Chat from './Chat';
import User from './User';
import openai from '@gptkit/core';
import { TMessage } from './types';

class Assistant extends User {
  constructor(chat: Chat) {
    super(chat, 'assistant');
  }

  async generate(): Promise<TMessage | undefined> {
    const { data } = await openai.createChatCompletion({
      ...this.chat.options,
      messages: this.chat.latestMessages,
      user: this.id,
    });

    const message: TMessage | undefined = data.choices[0].message;

    // Add message to chat
    if (message) {
      this.chat.messages.push(message);
    }

    // Add usage data to tracker
    if (data.usage) {
      this.chat.usage.add(data.usage);
    }

    return message;
  }
}

export default Assistant;
