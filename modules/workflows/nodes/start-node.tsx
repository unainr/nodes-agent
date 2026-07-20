// features/workflows/nodes/start-node.tsx


import type { NodeProps } from "@xyflow/react"
import { StepNodeType } from "./node-types"
import { nodeRegistry } from "./node-registry"
import { NodeShell } from "../ui/components/node-shell"

export function StartNode({ selected }: NodeProps<StepNodeType>) {
  const def = nodeRegistry.start
  return <NodeShell icon={def.icon} title={def.label} color={def.color} selected={selected} hasTarget={false} />
}