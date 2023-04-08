/*
  TODO: this should move to @gptkit/core
*/

import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration();
let openai = new OpenAIApi(configuration);

export function setOpenAIKey(apiKey: string) {
  const configuration = new Configuration({ apiKey });
  openai = new OpenAIApi(configuration);
}

export default openai;
