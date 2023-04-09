import { Configuration, OpenAIApi } from 'openai';

// Get a new instance of OpenAi with the given API key
const getOpenAiInstance = (apiKey: string) => {
  const configuration = new Configuration({
    apiKey,
  });
  return new OpenAIApi(configuration);
}

// Initialize openai with an empty API key
let openai = getOpenAiInstance('');

// Set openai's API key
export const setOpenAIKey = (apiKey: string) => openai = getOpenAiInstance(apiKey);

export default openai;