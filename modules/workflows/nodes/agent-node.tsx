// features/workflows/nodes/agent-node.tsx
import { useReactFlow } from "@xyflow/react"

import type { NodeProps } from "@xyflow/react"


import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { modelRegistry } from "@/lib/model-registry"
import { AgentNodeData, StepNodeType } from "./node-types"
import { nodeRegistry } from "./node-registry"
import { NodeShell } from "../ui/components/node-shell"

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