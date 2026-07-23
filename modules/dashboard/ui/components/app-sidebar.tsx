// components/app-sidebar.tsx
"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { OrganizationSwitcher } from "@clerk/nextjs"
import { Folder, FolderPlus, Trash2 } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarRail,
} from "@/components/ui/sidebar"
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
import { useWorkspaces } from "@/modules/workspaces/hooks/use-workspaces"
import { CreateWorkspaceDialog } from "@/modules/workspaces/ui/components/create-workspace-dialog"
import { useDeleteWorkspace } from "@/modules/workspaces/hooks/use-delete-workspace"
import { toast } from "sonner"

export function AppSidebar() {
 const pathname = usePathname();
const router = useRouter();

const { data: workspaces, isLoading } = useWorkspaces();

const id = workspaces?.[0]?.id ?? "";

const {
  mutate: deleteWorkspace,
  isPending: isDeleting,
} = useDeleteWorkspace(id);

const isEmpty = !isLoading && (workspaces?.length ?? 0) === 0;

const handleDelete = () => {
  if (!id) return;

  deleteWorkspace(undefined, {
    onSuccess: () => {
      toast.success("Workspace deleted successfully");
    },
  });
};
  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <OrganizationSwitcher
          hidePersonal
          afterSelectOrganizationUrl="/dashboard"
          afterCreateOrganizationUrl="/dashboard"
          afterLeaveOrganizationUrl="/dashboard"
          appearance={{
            elements: {
              rootBox: "w-full",
              organizationSwitcherTrigger:
                "w-full justify-between px-2 py-1.5 rounded-md hover:bg-sidebar-accent",
            },
          }}
        />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            {isLoading && (
              <SidebarMenu>
                {Array.from({ length: 3 }).map((_, i) => (
                  <SidebarMenuSkeleton key={i} showIcon />
                ))}
              </SidebarMenu>
            )}

            {isEmpty && (
              <div className="flex flex-col items-center gap-1.5 px-3 py-6 text-center">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sidebar-accent">
                  <FolderPlus className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-xs font-medium text-foreground">
                  No workspaces yet
                </p>
                <p className="text-xs text-muted-foreground">
                  Create one to get started
                </p>
              </div>
            )}

            {!isLoading && !isEmpty && (
              <SidebarMenu>
                {workspaces?.map((workspace) => {
                  const href = `/dashboard/workspace/${workspace.id}`
                  const isActive = pathname.startsWith(href)

                  return (
                    <SidebarMenuItem key={workspace.id}>
                      <SidebarMenuButton asChild isActive={isActive}>
                        <Link href={href}>
                          <Folder />
                          <span className="truncate">{workspace.name}</span>
                        </Link>
                      </SidebarMenuButton>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <SidebarMenuAction showOnHover>
                            <Trash2 className="h-3.5 w-3.5" />
                          </SidebarMenuAction>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Delete "{workspace.name}"?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This permanently deletes the workspace and
                              everything in it. This can't be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={handleDelete}
                              disabled={isDeleting}
                              className="text-destructive-foreground bg-destructive hover:bg-destructive/90"
                            >
                              {isDeleting ? "Deleting..." : "Delete"}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

     

      <SidebarRail />
    </Sidebar>
  )
}
