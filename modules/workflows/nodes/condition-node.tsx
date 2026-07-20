// features/workflows/nodes/condition-node.tsx
import { useReactFlow } from "@xyflow/react"

import type { NodeProps } from "@xyflow/react"


import { Textarea } from "@/components/ui/textarea"
import { nodeRegistry } from "./node-registry"
import { ConditionNodeData, StepNodeType } from "./node-types"
import { NodeShell } from "../ui/components/node-shell"

export function ConditionNode({ id, data, selected }: NodeProps<StepNodeType>) {
  const { updateNodeData } = useReactFlow()
  const def = nodeRegistry.condition
  const { instruction } = data as ConditionNodeData

  return (
    <NodeShell icon={def.icon} title={def.label} color={def.color} selected={selected}>
      <Textarea
        className="nodrag nopan w-full resize-none rounded-md border border-border bg-background px-2 py-1 text-xs"
        rows={3}
        placeholder="e.g. If the status is done, continue"
        value={instruction}
        onChange={(e) => updateNodeData(id, { instruction: e.target.value })}
      />
    </NodeShell>
  )
}