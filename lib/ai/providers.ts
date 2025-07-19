import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';
import { xai } from '@ai-sdk/xai';
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from './models.test';
import { isTestEnvironment } from '../constants';
import { createDeepSeek } from '@ai-sdk/deepseek';

const deepseek = createDeepSeek({
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
        'chat-model': deepseek(process.env.CHAT_MODEL || ''),
        'chat-model-reasoning': deepseek(
          process.env.CHAT_MODEL_REASONING || '',
        ),
        'title-model': deepseek(process.env.TITLE_MODEL || ''),
        'artifact-model': deepseek(process.env.ARTIFACT_MODEL || ''),
      },
      imageModels: {
        'small-model': xai.imageModel('grok-2-image'),
      },
    });
