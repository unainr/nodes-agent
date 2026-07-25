// components/app-sidebar.tsx
"use client"

import { OrganizationSwitcher } from "@clerk/nextjs"
import { Folder, FolderPlus, Plus } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarRail
} from "@/components/ui/sidebar"
import { useWorkspaces } from "@/modules/workspaces/hooks/use-workspaces"
import { WorkSpaceDeleteDialog } from "@/modules/workspaces/ui/components/workspace-delete-dialog"
import { CreateWorkspaceDialog } from "@/modules/workspaces/ui/components/create-workspace-dialog"
import { Button } from "@/components/ui/button"

export function AppSidebar() {
  const pathname = usePathname()
 

  const { data: workspaces, isLoading } = useWorkspaces()

  

  const isEmpty = !isLoading && (workspaces?.length ?? 0) === 0

 
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
        <div className="flex items-center justify-between px-2">
  <SidebarGroupLabel className="px-0">Workspaces</SidebarGroupLabel>
  <CreateWorkspaceDialog
    trigger={
      <Button size="icon" variant="ghost" className="h-6 w-6">
        <Plus className="h-3.5 w-3.5" />
      </Button>
    }
  />
</div>
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
                      <WorkSpaceDeleteDialog
                        name={workspace.name}
                        id={workspace.id}
                      />
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
