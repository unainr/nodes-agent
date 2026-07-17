import { FlowCanvas } from "@/modules/workflows/ui/components/flow-canvas"

interface Props{
    id:string
}
export const WorkSpacesView = ({ id }: Props) => {
  return (
    <div>
        <FlowCanvas/>
    </div>
  )
}
