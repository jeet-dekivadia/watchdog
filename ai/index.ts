import { anthropic } from '@ai-sdk/anthropic';
import { experimental_wrapLanguageModel as wrapLanguageModel } from 'ai';
import { type Model } from '@/lib/model';
import { customMiddleware } from './custom-middleware';

export const customModel = (modelName: Model['name']) => {
  const baseModel = anthropic(modelName);
  
  return {
    generate: async (text: string) => {
      const response = await baseModel.doGenerate({
        messages: [{
          role: 'user',
          content: `Analyze this statement for truthfulness and detect any misinformation: "${text}". Provide the percentage of factual content, misinformation, and justification for findings.`
        }]
      });
      
      return response;
    },
    middleware: customMiddleware
  };
};
