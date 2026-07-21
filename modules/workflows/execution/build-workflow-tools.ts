// modules/workflows/execution/build-workflow-tools.ts
import { z } from "zod"
import type { ToolSet } from "ai"
import type { StepNodeType, HttpRequestNodeData } from "../nodes/node-types"

function sanitizeToolName(id: string) {
  return `call_${id.replace(/[^a-zA-Z0-9_]/g, "_")}`
}

export function buildWorkflowTools(nodes: StepNodeType[]): ToolSet {
  const httpNodes = nodes.filter((n) => n.type === "http_request")

  const tools: ToolSet = {}

  for (const node of httpNodes) {
    const data = node.data as HttpRequestNodeData
    if (!data.url) continue // skip unconfigured nodes — nothing safe to call yet

    tools[sanitizeToolName(node.id)] = {
      description: `Call the "${data.method} ${data.url}" step configured on this workflow's canvas. Use this when the conversation needs that external action performed.`,
      inputSchema: z.object({
        payload: z
          .string()
          .optional()
          .describe("Optional JSON string to send as the request body, based on the current conversation."),
      }),
      execute: async ({ payload }) => {
        try {
          const res = await fetch(data.url, {
            method: data.method,
            headers: { "Content-Type": "application/json" },
            body: data.method === "GET" ? undefined : (payload ?? data.body),
          })

          const text = await res.text()
          return { status: res.status, ok: res.ok, body: text.slice(0, 2000) } // cap size fed back to the model
        } catch (err) {
          return { status: 0, ok: false, body: `Request failed: ${err instanceof Error ? err.message : "unknown error"}` }
        }
      },
    }
  }

  return tools
}