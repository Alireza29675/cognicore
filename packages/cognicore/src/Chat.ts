import { createChatCompletion } from "./services/openai";

type ChatModel = 'gpt-3.5-turbo-0613' | 'gpt-4-0613' | 'gpt-4-32k-0613';

interface Usage {
  input: number;
  output: number;
}

type ChatMessage = {
  role: 'system' | 'assistant' | 'user';
  content: string;
}

type Context = {
  role: 'context';
  name: string;
  content: string;
}

type Tool = {
  name: string;
  description: string;
}

type ToolUse = {
  role: 'function';
  name: string;
  ref: Tool;
  arguments: object;
  rejected: boolean;
  rejectionReason: string;
  result: object | null;
}

export type Message = Context | ToolUse | ChatMessage;

export default class Chat {
  protected model: ChatModel = 'gpt-3.5-turbo-0613';
  protected maxMessagesPerCall = 10;

  protected validateRequest(prompt: string): Promise<boolean> | boolean {
    // noop
    return !!prompt;
  }
  protected prepareRequest(prompt: string): Promise<void> | void {
    // noop
  }
  protected handleResponse(response: { usage: Usage, message: Message }): Promise<void> | void {
    // noop
  }

  public messages: Message[] = [];
  public readonly usage: Usage = { input: 0, output: 0 };

  public async call(prompt: string): Promise<string> {
    // Lifecycle: Validate request
    if (!await this.validateRequest(prompt)) {
      throw new Error('Invalid request.');
    }

    // Lifecycle: Prepare request
    await this.prepareRequest(prompt);

    const userMessage = {
      role: 'user',
      content: prompt,
    } as ChatMessage;

    const { message, usage } = await createChatCompletion({
      model: this.model,
      messages: [...this.messages, userMessage],
      functions: [],
    })

    // Convert OpenAI message to CogniCore message
    // TODO: Here

    const completionUsage = {
      input: usage.prompt_tokens || 0,
      output: usage.completion_tokens || 0,
    }

    this.handleResponse({
      message,
      usage: completionUsage,
    });

    this.messages = [
      ...this.messages,
      userMessage,
      message,
    ];

    this.usage.input += completionUsage.input;
    this.usage.output += completionUsage.output;

    return message.content;
  }
}