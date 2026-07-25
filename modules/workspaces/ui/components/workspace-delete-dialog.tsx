import React from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useDeleteWorkspace } from "../../hooks/use-delete-workspace"
import { SidebarMenuAction } from "@/components/ui/sidebar"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"

interface Props {
    name:string
    id:string
}
export const WorkSpaceDeleteDialog = ({name ,id}:Props) => {
  const { mutate: deleteWorkspace, isPending: isDeleting } =
    useDeleteWorkspace(id)
  const handleDelete = () => {
    if (!id) return

    deleteWorkspace(undefined, {
      onSuccess: () => {
        toast.success("Workspace deleted successfully")
      },
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <SidebarMenuAction showOnHover>
          <Trash2 className="h-3.5 w-3.5" />
        </SidebarMenuAction>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete "{name}"?</AlertDialogTitle>
          <AlertDialogDescription>
            This permanently deletes the workspace and everything in it. This
            can't be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            variant="primary"

            disabled={isDeleting}
            className="text-destructive-foreground bg-destructive hover:bg-destructive/90"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
