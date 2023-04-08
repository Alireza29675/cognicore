import Chat from '../Chat';
import { TMessage } from '../types';

const getLatestMessagesOfChat = (chat: Chat): TMessage[] => {
  let messages: TMessage[] = [];

  // Add system prompt if there is instructions
  if (chat.instructions) {
    messages.push({ role: 'system', content: chat.instructions });
  }

  // Add last n messages
  const latestMessages = chat.messages.slice(-chat.maxMessagesPerRequest);
  messages = messages.concat(latestMessages);

  return messages;
};

export default getLatestMessagesOfChat;
