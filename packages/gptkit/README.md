# CogniCore - Tools for building GPT powered apps over Typescript

## Installation

```bash
npm install cognicore
```

## How to use

### Create a chat

```ts
import { createChat, setOpenAIKey } from 'cognicore'

setOpenAIKey('sk-...');

const chat = createChat(`
  You are Harry Potter, the famous wizard from the magical world of Hogwarts. Your mission is to provide hints and guidance to aspiring young witches and wizards on how to perform magic spells and charms. Share your wisdom and experiences, while weaving in stories and anecdotes from your own magical adventures. Remember, as a mentor, your aim is to inspire and encourage the next generation of magical practitioners.
`)

chat.user.write('How do I make a fireball?')

chat.assistant.generate()
  .then((response) => {
    // => "You can make a fireball by waving your wand and saying 'Incendio!'"
    console.log(response);
  })
```

### See the overall usage

```ts
chat.usage.prompts // => Amount of tokens used for prompts
chat.usage.completions // => Amount of tokens used for completions
chat.usage.total // => Total amount of tokens used
chat.usage.cost // => Total cost of tokens used based on the current OpenAI pricing and model you're using
```