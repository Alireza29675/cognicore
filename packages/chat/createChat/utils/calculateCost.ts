// In US dollars per 1000 tokens
const pricing: Record<
  string,
  {
    prompt: number;
    completion: number;
  }
> = {
  'gpt-3.5-turbo': {
    prompt: 0.002,
    completion: 0.002,
  },
  'gpt-4': {
    prompt: 0.03,
    completion: 0.06,
  },
};

const calculateCost = (
  model: string,
  usage: {
    prompt: number;
    completion: number;
  }
): number => {
  const rate = pricing[model];

  if (!rate) {
    throw new Error(`No pricing information for model ${model}`);
  }

  return (
    (usage.prompt * rate.prompt + usage.completion * rate.completion) / 1000
  );
};

export default calculateCost;
