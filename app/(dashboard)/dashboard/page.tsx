import { DashboardView } from "@/modules/dashboard/ui/view/dashboard-view"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import type { Metadata } from "next";

const DashboardPage = async () => {
  const { userId } = await auth()
  if (!userId) redirect("/sign-in")
  return (
    <>
      <DashboardView />
    </>
  )
}

export default DashboardPage

export const metadata: Metadata = {
  title: "Dashboard - Seerforge",
  description:
    "View and manage your workspaces, switch organizations, and jump back into any workflow you're building.",
}