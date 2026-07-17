// features/workflows/nodes/node-registry.ts
import { Play, Bot, GitBranch } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import type { NodeData, NodeKind } from "./node-types"
import type { NodeColor } from "./node-colors"

export type NodeDefinition = {
  kind: NodeKind
  label: string
  icon: LucideIcon
  color: NodeColor
  hasTarget?: boolean
  defaultData: NodeData
}

export const nodeRegistry: Record<NodeKind, NodeDefinition> = {
  start: {
    kind: "start", label: "Start", icon: Play, color: "emerald",
    hasTarget: false, defaultData: { kind: "start" },
  },
  agent: {
    kind: "agent", label: "AI Agent", icon: Bot, color: "violet",
    defaultData: { kind: "agent", model: "gpt-4o-mini", prompt: "" },
  },
  condition: {
      kind: "condition", label: "Condition", icon: GitBranch, color: "amber",
  defaultData: { kind: "condition", instruction: "" },
  },
}

export const nodeList = Object.values(nodeRegistry)