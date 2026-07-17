// // lib/ai/resolve-model.ts
// import { openai } from "@ai-sdk/openai"
// import { anthropic } from "@ai-sdk/anthropic"
// import { getModelDefinition } from "./model-registry"

// export function resolveModel(modelId: string) {
//   const def = getModelDefinition(modelId)
//   if (!def) throw new Error(`Unknown model id: ${modelId}`)

//   switch (def.provider) {
//     case "openai":
//       return openai(def.id)
//     case "anthropic":
//       return anthropic(def.id)
//   }
// }



// wherever you execute an agent node
// import { generateText } from "ai"
// import { resolveModel } from "@/lib/ai/resolve-model"

// async function runAgentNode(data: AgentNodeData) {
//   const { text } = await generateText({
//     model: resolveModel(data.model),
//     prompt: data.prompt,
//   })
//   return text
// }