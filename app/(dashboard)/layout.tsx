import { SignInButtonClerk } from "@/components/clerk-sign-button/Sign-in-button"
import { ThemeSwitcher } from "@/components/theme/mode-toggle"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AppSidebar } from "@/modules/dashboard/ui/components/app-sidebar"
import { TypeLayout } from "@/types"

const Layout = ({ children }: TypeLayout) => {
  return (
    <SidebarProvider className="h-svh">
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
          <div className="flex w-full items-center justify-end gap-3">
            <SignInButtonClerk />
            <ThemeSwitcher />
          </div>
        </header>
        <SidebarInset className="min-h-0 overflow-hidden border shadow-none!">{children}</SidebarInset>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default Layout
