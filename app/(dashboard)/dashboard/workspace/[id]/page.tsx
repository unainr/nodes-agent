import { Room } from "@/modules/liveblocks/ui/components/room"
import { WorkSpacesView } from "@/modules/workspaces/ui/view/workspaces-view"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

interface WorkSpacePageProps {
    params:Promise<{ id: string }>
}
const WorkSpacePage = async({ params }: WorkSpacePageProps) => {
    const {id} = await params
     const { orgId } = await auth()
     if(!orgId)redirect("/sign-in") 
  return (
    <Room roomId={id}>
        <WorkSpacesView id={id} />
    </Room>
  )
}

export default WorkSpacePage