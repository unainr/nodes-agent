// app/workspace/[id]/not-found.tsx
import Link from "next/link"
import { FolderX } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function WorkspaceNotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <FolderX className="h-5 w-5 text-muted-foreground" />
      </div>
      <div className="space-y-1">
        <h2 className="text-sm font-semibold">Workspace not found</h2>
        <p className="text-sm text-muted-foreground">
          This workspace doesn't exist, or it belongs to a different organization.
        </p>
      </div>
      <Button asChild size="sm" className="mt-2">
        <Link href="/dashboard">Back to dashboard</Link>
      </Button>
    </div>
  )
}