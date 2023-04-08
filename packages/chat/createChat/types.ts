import {
  CreateChatCompletionRequest,
  ChatCompletionRequestMessage,
  CreateCompletionResponseUsage,
} from 'openai';

export type TChatOptions = Omit<CreateChatCompletionRequest, 'messages'>;

export type TRole = 'user' | 'assistant';

export type TMessage = ChatCompletionRequestMessage;

export type TUsage = CreateCompletionResponseUsage;
