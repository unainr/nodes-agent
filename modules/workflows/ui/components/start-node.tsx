// features/workflows/nodes/start-node.tsx
import { nodeRegistry } from "../../nodes/node-registry"
import { StepNodeType } from "../../nodes/node-types"
import { NodeShell } from "./node-shell"
import type { NodeProps } from "@xyflow/react"

export function StartNode({ selected }: NodeProps<StepNodeType>) {
  const def = nodeRegistry.start
  return <NodeShell icon={def.icon} title={def.label} color={def.color} selected={selected} hasTarget={false} />
}