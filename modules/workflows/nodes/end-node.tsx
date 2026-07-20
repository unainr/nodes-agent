// modules/workflows/nodes/end-node.tsx
import { useReactFlow } from "@xyflow/react"
import { nodeRegistry } from "./node-registry"
import type { NodeProps } from "@xyflow/react"
import type { EndNodeData, StepNodeType } from "./node-types"
import { NodeShell } from "../ui/components/node-shell"

export function EndNode({ id, data, selected }: NodeProps<StepNodeType>) {
  const { updateNodeData } = useReactFlow()
  const def = nodeRegistry.end
  const { outputVariable } = data as EndNodeData

  return (
    <NodeShell icon={def.icon} title={def.label} color={def.color} selected={selected} hasSource={false}>
      <input
        className="nodrag w-full rounded-md border border-border bg-background px-2 py-1 text-xs"
        placeholder="Output variable (optional)"
        value={outputVariable}
        onChange={(e) => updateNodeData(id, { outputVariable: e.target.value })}
      />
    </NodeShell>
  )
}