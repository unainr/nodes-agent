// lib/ai/model-registry.ts

export type ModelDefinition = {
  id: string           // exact string passed to the AI SDK provider
  label: string         // what the user sees in the dropdown
  openrouterModel: string // the real model actually called

}

export const modelRegistry: ModelDefinition[] = [
  { id: "gpt-4o-mini", label: "GPT-4o Mini", openrouterModel: "openai/gpt-oss-20b:free" },
  { id: "gpt-4o", label: "GPT-4o", openrouterModel: "openai/gpt-oss-20b:free" },
  { id: "claude-sonnet-4-6", label: "Claude Sonnet", openrouterModel: "openai/gpt-oss-20b:free" },
  { id: "claude-haiku-4-5", label: "Claude Haiku", openrouterModel: "openai/gpt-oss-20b:free" },
]

export function getModelDefinition(id: string) {
  return modelRegistry.find((m) => m.id === id) ?? modelRegistry[0]
}