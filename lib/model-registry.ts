// lib/ai/model-registry.ts
export type ModelProvider = "openai" | "anthropic"

export type ModelDefinition = {
  id: string           // exact string passed to the AI SDK provider
  label: string         // what the user sees in the dropdown
  provider: ModelProvider
}

export const modelRegistry: ModelDefinition[] = [
  { id: "gpt-4o-mini", label: "GPT-4o Mini", provider: "openai" },
  { id: "gpt-4o", label: "GPT-4o", provider: "openai" },
  { id: "claude-sonnet-4-6", label: "Claude Sonnet", provider: "anthropic" },
  { id: "claude-haiku-4-5-20251001", label: "Claude Haiku", provider: "anthropic" },
]

export function getModelDefinition(id: string) {
  return modelRegistry.find((m) => m.id === id)
}