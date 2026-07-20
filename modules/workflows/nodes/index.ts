// features/workflows/nodes/index.ts
import type { NodeTypes } from "@xyflow/react"
import { AgentNode } from "./agent-node"
import { ConditionNode } from "./condition-node"
import { HttpRequestNode } from "./http-request-node"
import { EndNode } from "./end-node"
import { NoteNode } from "./note-node"
import { StartNode } from "./start-node"


export const nodeTypes: NodeTypes = {
  start: StartNode,
  agent: AgentNode,
  condition: ConditionNode,
  http_request: HttpRequestNode,
  end: EndNode,
  note: NoteNode,
}