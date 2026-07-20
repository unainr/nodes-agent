// modules/workflows/nodes/note-node.tsx
import { useReactFlow } from "@xyflow/react"
import type { NodeProps } from "@xyflow/react"
import type { NoteNodeData, StepNodeType } from "./node-types"
import { Textarea } from "@/components/ui/textarea"

export function NoteNode({ id, data, selected }: NodeProps<StepNodeType>) {
  const { updateNodeData } = useReactFlow()
  const { text } = data as NoteNodeData

  return (
    <div
      className={`w-56 rounded-lg border bg-yellow-50 p-2.5 shadow-sm dark:bg-yellow-500/10 ${
        selected ? "border-yellow-400 ring-2 ring-yellow-200" : "border-yellow-200 dark:border-yellow-500/30"
      }`}
    >
      <Textarea
        className="nodrag nopan w-full resize-none bg-transparent text-xs text-yellow-900 outline-none placeholder:text-yellow-700/50 dark:text-yellow-100"
        rows={4}
        placeholder="Leave a note..."
        value={text}
        onChange={(e) => updateNodeData(id, { text: e.target.value })}
      />
    </div>
  )
}