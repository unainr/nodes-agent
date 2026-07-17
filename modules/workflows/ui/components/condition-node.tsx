// features/workflows/nodes/condition-node.tsx
import { useReactFlow } from "@xyflow/react"
import { NodeShell } from "./node-shell"
import type { NodeProps } from "@xyflow/react"
import { nodeRegistry } from "../../nodes/node-registry"
import { ConditionNodeData, StepNodeType } from "../../nodes/node-types"
import { Textarea } from "@/components/ui/textarea"

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