// features/workflows/nodes/node-types.ts
import type { Node } from "@xyflow/react"

export type NodeKind = "start" | "agent" | "condition"

export type StartNodeData = { kind: "start" }
// features/workflows/nodes/node-types.ts (unchanged shape, just a reminder)
export type AgentNodeData = { kind: "agent"; model: string; prompt: string }
export type ConditionNodeData = { kind: "condition"; instruction: string }

export type NodeData = StartNodeData | AgentNodeData | ConditionNodeData

export type StepNodeType = Node<NodeData, NodeKind>




// export type NodeKind = "start" | "agent" | "condition" | "delay" // ← add here

// export type DelayNodeData = { kind: "delay"; seconds: number }

// export type NodeData = StartNodeData | AgentNodeData | ConditionNodeData | DelayNodeData