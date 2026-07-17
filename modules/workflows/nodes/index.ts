// features/workflows/nodes/index.ts
import type { NodeTypes } from "@xyflow/react"
import { StartNode } from "../ui/components/start-node"
import { AgentNode } from "../ui/components/agent-node"
import { ConditionNode } from "../ui/components/condition-node"

export const nodeTypes: NodeTypes = {
  start: StartNode,
  agent: AgentNode,
  condition: ConditionNode,
}