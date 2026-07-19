// features/workflows/node-sidebar.tsx
"use client"

import { useState } from "react"
import { useReactFlow } from "@xyflow/react"
import { nanoid } from "nanoid"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { nodeList } from "../../nodes/node-registry"
import { nodeColorClasses } from "../../nodes/node-colors"

export function NodeSidebar() {
  const { addNodes, screenToFlowPosition } = useReactFlow()
  const [open, setOpen] = useState(false)

  const handleAdd = (kind: (typeof nodeList)[number]["kind"]) => {
    const def = nodeList.find((n) => n.kind === kind)!
    const position = screenToFlowPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 })

    addNodes({ id: nanoid(), type: def.kind, position, data: def.defaultData })
    setOpen(false)
  }

  return (
   <Sheet open={open} onOpenChange={setOpen}>
  <SheetTrigger asChild>
    <Button
      size="icon"
      className="fixed right-6 top-1/2 z-10 h-12 w-12 -translate-y-1/2 rounded shadow-lg transition-transform hover:scale-105"
    >
      <Plus className="h-5 w-5" />
    </Button>
  </SheetTrigger>

  <SheetContent side="right" className="w-80">
    <SheetHeader>
      <SheetTitle>Add a node</SheetTitle>
      <p className="text-sm text-muted-foreground">
        Choose a node type to add to your workflow
      </p>
    </SheetHeader>

    <div className="mt-4 flex flex-col gap-1.5">
      {nodeList.map((def) => {
  const classes = nodeColorClasses[def.color]
  return (
    <Button
      key={def.kind}
      variant="ghost"
      onClick={() => handleAdd(def.kind)}
      className="group h-auto w-full justify-start gap-3 rounded-lg border border-transparent px-3 py-2.5 text-left text-sm font-normal hover:border-border hover:bg-accent"
    >
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md transition-transform group-hover:scale-105 ${classes.badge}`}
      >
        <def.icon className="h-4 w-4" />
      </span>
      <span className="font-medium text-foreground">{def.label}</span>
    </Button>
  )
})}
    </div>
  </SheetContent>
</Sheet>
  )
}