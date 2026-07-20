// features/workflows/nodes/node-registry.ts
import { Play, Bot, GitBranch, Globe, Flag, StickyNote } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import type { NodeData, NodeKind } from "./node-types"
import type { NodeColor } from "./node-colors"

export type NodeDefinition = {
  kind: NodeKind
  label: string
  icon: LucideIcon
  color: NodeColor
  hasTarget?: boolean
    hasSource?: boolean
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
   http_request: {
    kind: "http_request", label: "HTTP Request", icon: Globe, color: "sky",
    defaultData: { kind: "http_request", method: "GET", url: "" },
  },
  end: {
    kind: "end", label: "End", icon: Flag, color: "rose",
    hasSource: false, defaultData: { kind: "end", outputVariable: "" },
  },
  note: {
    kind: "note", label: "Note", icon: StickyNote, color: "yellow",
    hasTarget: false, hasSource: false, defaultData: { kind: "note", text: "" },
  },
}

export const nodeList = Object.values(nodeRegistry)