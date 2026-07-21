// lib/ai/openrouter.ts
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';


export const openrouter = createOpenAICompatible({
  name: "openrouter",
  apiKey: process.env.OPEN_ROUTER_API_KEY!,
  baseURL: "https://openrouter.ai/api/v1",
})