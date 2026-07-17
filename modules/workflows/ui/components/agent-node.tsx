// features/workflows/nodes/agent-node.tsx
import { useReactFlow } from "@xyflow/react"
import { NodeShell } from "./node-shell"
import type { NodeProps } from "@xyflow/react"
import { nodeRegistry } from "../../nodes/node-registry"
import { AgentNodeData, StepNodeType } from "../../nodes/node-types"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { modelRegistry } from "@/lib/model-registry"

export function AgentNode({ id, data, selected }: NodeProps<StepNodeType>) {
  const { updateNodeData } = useReactFlow()
  const def = nodeRegistry.agent
  const { model, prompt } = data as AgentNodeData

  return (
    <NodeShell icon={def.icon} title={def.label} color={def.color} selected={selected}>
      <Select value={model} onValueChange={(value) => updateNodeData(id, { model: value })}>
        <SelectTrigger className="nodrag h-8 w-full text-xs">
          <SelectValue placeholder="Select model" />
        </SelectTrigger>
        <SelectContent className="nodrag">
          {modelRegistry.map((m) => (
            <SelectItem key={m.id} value={m.id} className="text-xs">
              {m.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Textarea
        className="nodrag nopan w-full resize-none text-xs"
        rows={3}
        placeholder="System prompt..."
        value={prompt}
        onChange={(e) => updateNodeData(id, { prompt: e.target.value })}
      />
    </NodeShell>
  )
}