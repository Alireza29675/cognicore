import Chat from './Chat';
import User from './User';
import openai from '@cognicore/core';
import { TMessage } from './types';

class Assistant extends User {
  // Constructor for Assistant class, which extends User class
  constructor(chat: Chat) {
    super(chat, 'assistant');
  }

  // Generates a message using OpenAI
  async generate(): Promise<TMessage | undefined> {
    // Creates chat completion using chat options, latest messages, and user ID
    const { data } = await openai.createChatCompletion({
      ...this.chat.options,
      messages: this.chat.latestMessages,
      user: this.id,
    });

    // Gets the message from the data
    const message: TMessage | undefined = data.choices[0].message;

    // If the message exists, adds it to the chat
    if (message) {
      this.chat.messages.push(message);
    }

    // Adds usage data to the tracker
    if (data.usage) {
      this.chat.usage.add(data.usage);
    }

    return message;
  }
}

export default Assistant;
