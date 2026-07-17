// features/workflows/nodes/node-colors.ts
export type NodeColor = "emerald" | "violet" | "amber"

export const nodeColorClasses: Record<NodeColor, { badge: string }> = {
  emerald: { badge: "bg-emerald-500" },
  violet: { badge: "bg-violet-500" },
  amber: { badge: "bg-amber-500" },
}