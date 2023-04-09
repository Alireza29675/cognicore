const getPricing = (model: string): {
  prompt: number;
  completion: number;
} => {
  switch (model) {
    // GPT-3.5-Turbo pricing
    case 'gpt-3.5-turbo': {
      return {
        prompt: 0.002,
        completion: 0.002,
      };
    }

    // GPT-4 pricing
    case 'gpt-4': {
      return {
        prompt: 0.03,
        completion: 0.06,
      };
    }

    // If model is not listed, prices will be NaN
    default: {
      return {
        prompt: NaN,
        completion: NaN,
      };
    }
  }
}

// Calculates cost of a model based on prompt and completion usage
const calculateCost = (
  model: string,
  usage: {
    prompt: number;
    completion: number;
  }
): number => {
  // Retrieve rate from pricing model
  const rate = getPricing(model);

  if (!rate) {
    throw new Error(`No pricing information for model ${model}`);
  }

  // Calculate cost using prompt and completion rates
  return (usage.prompt * rate.prompt + usage.completion * rate.completion) / 1000;
};

export default calculateCost;