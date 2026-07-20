// features/workflows/nodes/node-colors.ts
export type NodeColor =
  "emerald" | "violet" | "amber" | "sky" | "rose" | "yellow"

export const nodeColorClasses: Record<NodeColor, { badge: string }> = {
  emerald: { badge: "bg-emerald-500" },
  violet: { badge: "bg-violet-500" },
  amber: { badge: "bg-amber-500" },
  sky: { badge: "bg-sky-500" },
  rose: { badge: "bg-rose-500" },
  yellow: { badge: "bg-yellow-500" },
}
