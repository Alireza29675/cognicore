import Chat from './Chat';
import { TUsage } from './types';
import calculateCost from './utils/calculateCost';

class Usage {
  private chat: Chat;
  prompt = 0;
  completion = 0;

  constructor(chat: Chat) {
    this.chat = chat;
  }

  // Adds prompt and completion tokens to the Usage instance
  add(usage: TUsage): Usage {
    this.prompt += usage.prompt_tokens;
    this.completion += usage.completion_tokens;

    return this;
  }

  // Calculates the total number of tokens
  get total(): number {
    return this.prompt + this.completion;
  }

  // Calculates the cost of the tokens
  get cost(): number {
    // Calculates cost based on the model and prompt/completion tokens
    return calculateCost(this.chat.options.model, {
      prompt: this.prompt,
      completion: this.completion,
    });
  }
}

export default Usage;