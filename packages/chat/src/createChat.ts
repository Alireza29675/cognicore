import Chat from './Chat';
import { TChatOptions } from './types';

const createChat = (
  instructions: string,
  options: Partial<TChatOptions> = {}
): Chat => {
  return new Chat(instructions, options);
};

export default createChat;
