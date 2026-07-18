'use client'
import { FlowCanvas } from "@/modules/workflows/ui/components/flow-canvas"

import { notFound } from "next/navigation"
import { useWorkspacesId } from "../../hooks/use-get-workspaces-id"
import WorkspaceNotFound from "../components/not-found-state"

interface Props{
    id:string
}
export const WorkSpacesView = ({ id }: Props) => {
  const { data: workspace, isLoading, isError } = useWorkspacesId(id)

  if (isLoading) {
    return <div className="p-6 text-sm text-muted-foreground">Loading workspace...</div>
  }

  if (isError || !workspace) {
    return <WorkspaceNotFound />
  }

  return (
    <div>
        <FlowCanvas/>
    </div>
  )
}
