import { Configuration, OpenAIApi } from 'openai';

// Extend the OpenAIApi class with an index signature
interface OpenAIApiWithIndexSignature extends OpenAIApi {
  [key: string | symbol]: unknown;
}

class Core {
  private configuration = new Configuration();
  private _unproxiedOpenAI = new OpenAIApi(this.configuration) as OpenAIApiWithIndexSignature;
  // Create a proxy for the openai instance to intercept requests and responses
  openai = new Proxy(this._unproxiedOpenAI, {
    get: (target, prop) => {
      const method = target[prop];
      // Only intercept methods
      if (typeof method === 'function') {
        // Return a function that intercepts the request and response
        return (...args: unknown[]) => {
          this.onRequest(args);
          const result = method.apply(target, args);
          // Whether the result is a promise or not, intercept the response
          // and call the onResponse method with the returned result
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

  // TODO: measuring the usage goes here
  private async onResponse(result: unknown) {
    console.log(result);
  }
}

const core = new Core();

// Set openai's API key
export const setOpenAIKey = (apiKey: string) => core.apiKey = apiKey;

export default core.openai;