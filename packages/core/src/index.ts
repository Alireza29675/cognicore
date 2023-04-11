import { Configuration, OpenAIApi } from 'openai';

// Extend the OpenAIApi class with an index signature
interface OpenAIApiWithIndexSignature extends OpenAIApi {
  [key: string | symbol]: unknown;
}

class Core {
  private configuration = new Configuration();
  private _unproxiedOpenAI = new OpenAIApi(this.configuration) as OpenAIApiWithIndexSignature;
  openai = new Proxy(this._unproxiedOpenAI, {
    get: (target, prop) => {
      const method = target[prop];
      if (method && typeof method === 'function') {
        return (...args: unknown[]) => {
          this.onRequest(args);
          const result = method.apply(target, args);
          Promise.resolve(result).then(this.onResponse);
          return result;
        }
      }
    }
  });

  constructor(apiKey = '') {
    if (apiKey) {
      this.apiKey = apiKey;
    }
  }

  set apiKey(apiKey: string) {
    this.configuration.apiKey = apiKey;
    this.configuration.baseOptions.headers['Authorization'] = `Bearer ${apiKey}`;
  }

  private async onRequest(request: unknown) {
    console.log(request);
  }

  private async onResponse(result: unknown) {
    console.log(result);
  }
}

const core = new Core();

// Set openai's API key
export const setOpenAIKey = (apiKey: string) => core.apiKey = apiKey;

export default core.openai;