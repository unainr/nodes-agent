import { liveblocks } from "@/lib/liveblocks"
import { Room } from "@/modules/liveblocks/ui/components/room"
import { WorkSpacesView } from "@/modules/workspaces/ui/view/workspaces-view"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import type { Metadata } from "next";

interface WorkSpacePageProps {
    params:Promise<{ id: string }>
}
const WorkSpacePage = async({ params }: WorkSpacePageProps) => {
    const {id} = await params
     const { orgId } = await auth()
     if(!orgId)redirect("/sign-in") 
        await liveblocks.getOrCreateRoom(id,{
    organizationId:orgId,
    defaultAccesses:[],
    groupsAccesses:{
        [orgId]:["room:write"]
    },
    
})
  return (
    <Room roomId={id}>
        <WorkSpacesView id={id} />
    </Room>
  )
}

export default WorkSpacePage


export const metadata: Metadata = {
  title: "Workflow - Seerforge",
  description:
    "Build and test your AI agent workflow on a live, collaborative canvas.",
}