import axios from "axios";
import { config } from '../config'

axios.defaults.baseURL = 'https://api.openai.com/v1/';

axios.interceptors.request.use(req => {
  if (!config.apiKey) {
    throw new Error('API Key is not set');
  }

  req.headers['Authorization'] = `Bearer ${config.apiKey}`;
  return req;
});

type ChatCompletionArguments = {
  model: string;
  messages: object[];
  functions: object[];
  temprature?: number;
}

type OpenAIMessage = {
  role: 'system' | 'user';
  content: string;
} | {
  role: 'assistant';
  content: string;
  function_call?: {
    name: string;
    arguments: string;
  }
}

type ChatCompletionResponse = {
  id: string;
  object: string;
  created: number,
  model: string;
  usage: {
    prompt_tokens: number,
    completion_tokens: number,
    total_tokens: number
  },
  choices: [
    {
      message: OpenAIMessage,
      finish_reason: 'length' | 'function_call' | 'stop' | null;
      index: number
    }
  ]
}

export const createChatCompletion = async ({
  model,
  messages,
  functions
}: ChatCompletionArguments) => {
  const requestData = {
    model,
    messages,
    functions
  };

  if (!functions.length) {
    delete requestData.functions;
  }

  const { data } = await axios.post('chat/completions', requestData) as { data: ChatCompletionResponse };

  return {
    message: data.choices[0].message,
    usage: data.usage
  }
}