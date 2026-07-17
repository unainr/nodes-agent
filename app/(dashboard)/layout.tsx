import { Sidebar, SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/modules/dashboard/ui/components/app-sidebar"
import { TypeLayout } from "@/types"

const Layout = ({children}:TypeLayout) => {
  return (
 <SidebarProvider className="h-svh">
      <AppSidebar />
      <main>
        <SidebarTrigger />
         <SidebarInset className="min-h-0 overflow-hidden border shadow-none!">{children}</SidebarInset>
      </main>
    </SidebarProvider>
  )
}

export default Layout