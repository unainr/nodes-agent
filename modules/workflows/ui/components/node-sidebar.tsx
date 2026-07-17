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
        <Button size="icon" className="fixed bottom-6 right-6 z-10 h-12 w-12 rounded-full shadow-lg">
          <Plus className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-72">
        <SheetHeader>
          <SheetTitle>Add a node</SheetTitle>
        </SheetHeader>

        <div className="mt-4 space-y-1">
          {nodeList.map((def) => {
            const classes = nodeColorClasses[def.color]
            return (
              <button
                key={def.kind}
                onClick={() => handleAdd(def.kind)}
                className="flex w-full items-center gap-3 rounded-lg border border-transparent px-3 py-2.5 text-left text-sm hover:border-border hover:bg-accent"
              >
                <span className={`flex h-8 w-8 items-center justify-center rounded-md ${classes.badge}`}>
                  <def.icon className={`h-4 w-4 ${classes.badge}`} />
                </span>
                <span className="font-medium text-foreground">{def.label}</span>
              </button>
            )
          })}
        </div>
      </SheetContent>
    </Sheet>
  )
}