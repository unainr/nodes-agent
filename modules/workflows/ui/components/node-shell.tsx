// features/workflows/nodes/node-shell.tsx
import { Handle, Position } from "@xyflow/react"
import type { LucideIcon } from "lucide-react"
import { NodeColor, nodeColorClasses } from "../../nodes/node-colors"

type NodeShellProps = {
  icon: LucideIcon
  title: string
  color: NodeColor
  selected?: boolean
  hasSource?: boolean
  hasTarget?: boolean
  children?: React.ReactNode
}

export function NodeShell({
  icon: Icon, title, color, selected, hasSource = true, hasTarget = true, children,
}: NodeShellProps) {
  const classes = nodeColorClasses[color]

  return (
    <div
      className={`min-w-64 rounded-[20px] border bg-card text-card-foreground shadow-md transition-shadow ${
        selected ? "border-primary ring-2 ring-primary/25" : "border-border"
      }`}
    >
      {hasTarget && (
        <Handle
          type="target"
          position={Position.Left}
          className="h-4! w-1.5! rounded-full! border-none! bg-muted-foreground/40!"
        />
      )}

      <div className="flex items-center gap-3 px-3 py-3">
        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${classes.badge}`}>
          <Icon className="h-5 w-5 text-white" />
        </span>
        <span className="text-base font-bold leading-none">{title}</span>
      </div>

      {children && (
        <div className="space-y-2 border-t border-border px-3 py-2.5">
          {children}
        </div>
      )}

      {hasSource && (
        <Handle
          type="source"
          position={Position.Right}
          className="h-4! w-1.5! rounded-full! border-none! bg-muted-foreground/40!"
        />
      )}
    </div>
  )
}