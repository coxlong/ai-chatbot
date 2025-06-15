import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';
import { isTestEnvironment } from '../constants';
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from './models.test';
import { createOpenAI } from '@ai-sdk/openai';

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_API_BASE_URL,
});

export const myProvider = isTestEnvironment
  ? customProvider({
      languageModels: {
        'chat-model': chatModel,
        'chat-model-reasoning': reasoningModel,
        'title-model': titleModel,
        'artifact-model': artifactModel,
      },
    })
  : customProvider({
      languageModels: {
        'chat-model': openai(process.env.CHAT_MODEL || ''),
        'chat-model-reasoning': wrapLanguageModel({
          model: openai(process.env.CHAT_MODEL_REASONING || ''),
          middleware: extractReasoningMiddleware({ tagName: 'think' }),
        }),
        'title-model': openai(process.env.TITLE_MODEL || ''),
        'artifact-model': openai(process.env.ARTIFACT_MODEL || ''),
      },
      imageModels: {},
    });
