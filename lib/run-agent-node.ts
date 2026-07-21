// modules/workflows/execution/run-agent-node.ts

import type { AgentNodeData } from "@/modules/workflows/nodes/node-types"
import { getModelDefinition } from "./model-registry"
import { generateText } from 'ai';
import { openrouter } from "./open-router";
import { buildAgentSystemPrompt } from "./utils";

export async function runAgentNode(data: AgentNodeData, inputContext: Record<string, unknown>) {
  const modelDef = getModelDefinition(data.model)

  const { text } = await generateText({
    model: openrouter(modelDef.openrouterModel), // ← .chat(), not the bare factory call
    system: buildAgentSystemPrompt(data.prompt),
    prompt: JSON.stringify(inputContext),
  })

  return text
}