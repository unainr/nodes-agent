// features/workflows/nodes/node-types.ts
import type { Node } from "@xyflow/react"

export type NodeKind = "start" | "agent" | "condition" | "http_request" | "end" | "note"

export type StartNodeData = { kind: "start" }
// features/workflows/nodes/node-types.ts (unchanged shape, just a reminder)
export type AgentNodeData = { kind: "agent"; model: string; prompt: string }
export type ConditionNodeData = { kind: "condition"; instruction: string }
export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE"
export type HttpRequestNodeData = {
  kind: "http_request"
  method: HttpMethod
  url: string
  body?: string
}

export type EndNodeData = { kind: "end"; outputVariable: string }

export type NoteNodeData = { kind: "note"; text: string }
export type NodeData =
  | StartNodeData
  | AgentNodeData
  | ConditionNodeData
  | HttpRequestNodeData
  | EndNodeData
  | NoteNodeData

export type StepNodeType = Node<NodeData, NodeKind>




// export type NodeKind = "start" | "agent" | "condition" | "delay" // ← add here

// export type DelayNodeData = { kind: "delay"; seconds: number }

// export type NodeData = StartNodeData | AgentNodeData | ConditionNodeData | DelayNodeData