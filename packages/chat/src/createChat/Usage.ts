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

  add(usage: TUsage): Usage {
    this.prompt += usage.prompt_tokens;
    this.completion += usage.completion_tokens;

    return this;
  }

  get total(): number {
    return this.prompt + this.completion;
  }

  get cost(): number {
    return calculateCost(this.chat.options.model, {
      prompt: this.prompt,
      completion: this.completion,
    });
  }
}

export default Usage;
