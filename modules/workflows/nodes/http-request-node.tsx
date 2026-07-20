// modules/workflows/nodes/http-request-node.tsx
import { useReactFlow } from "@xyflow/react"
import { nodeRegistry } from "./node-registry"
import type { NodeProps } from "@xyflow/react"
import type { HttpMethod, HttpRequestNodeData, StepNodeType } from "./node-types"
import { NodeShell } from "../ui/components/node-shell"

const METHODS: HttpMethod[] = ["GET", "POST", "PUT", "DELETE"]

export function HttpRequestNode({ id, data, selected }: NodeProps<StepNodeType>) {
  const { updateNodeData } = useReactFlow()
  const def = nodeRegistry.http_request
  const { method, url, body } = data as HttpRequestNodeData

  return (
    <NodeShell icon={def.icon} title={def.label} color={def.color} selected={selected}>
      <div className="flex gap-1.5">
        <select
          className="nodrag w-20 shrink-0 rounded-md border border-border bg-background px-1 py-1 text-xs"
          value={method}
          onChange={(e) => updateNodeData(id, { method: e.target.value as HttpMethod })}
        >
          {METHODS.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
        <input
          className="nodrag w-full rounded-md border border-border bg-background px-2 py-1 text-xs"
          placeholder="https://api.example.com/..."
          value={url}
          onChange={(e) => updateNodeData(id, { url: e.target.value })}
        />
      </div>

      {(method === "POST" || method === "PUT") && (
        <textarea
          className="nodrag nopan w-full resize-none rounded-md border border-border bg-background px-2 py-1 text-xs font-mono"
          rows={3}
          placeholder='{ "key": "value" }'
          value={body ?? ""}
          onChange={(e) => updateNodeData(id, { body: e.target.value })}
        />
      )}
    </NodeShell>
  )
}