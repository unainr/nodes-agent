import { WorkSpacesView } from "@/modules/workspaces/ui/view/workspaces-view"

interface WorkSpacePageProps {
    params:Promise<{ id: string }>
}
const WorkSpacePage = async({ params }: WorkSpacePageProps) => {
    const {id} = await params
  return (
    <div>
        <WorkSpacesView id={id} />
    </div>
  )
}

export default WorkSpacePage