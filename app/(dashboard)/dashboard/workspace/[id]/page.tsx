import { Room } from "@/modules/liveblocks/ui/components/room"
import { WorkSpacesView } from "@/modules/workspaces/ui/view/workspaces-view"

interface WorkSpacePageProps {
    params:Promise<{ id: string }>
}
const WorkSpacePage = async({ params }: WorkSpacePageProps) => {
    const {id} = await params
  return (
    <Room roomId={id}>
        <WorkSpacesView id={id} />
    </Room>
  )
}

export default WorkSpacePage