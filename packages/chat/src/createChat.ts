import Chat from './Chat';
import { TChatOptions } from './types';

// Creates a new instance of a Chat class with the given instructions and options
const createChat = (
  instructions: string,
  options: Partial<TChatOptions> = {}
): Chat => {
  return new Chat(instructions, options);
};

// Exports the createChat function
export default createChat;
