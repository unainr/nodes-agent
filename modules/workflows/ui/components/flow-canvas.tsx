// features/workflows/flow-canvas.tsx
"use client"

import { useCallback, useState } from "react"
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  Panel,
} from "@xyflow/react"
import type { Edge } from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { AvatarStack } from "@liveblocks/react-ui"
import "@liveblocks/react-ui/styles.css"
import "@liveblocks/react-flow/styles.css"
import { useLiveblocksFlow, Cursors } from "@liveblocks/react-flow"

import { NodeSidebar } from "./node-sidebar"
import { AgentNodeData, StepNodeType } from "../../nodes/node-types"
import { WorkflowGraph } from "@/drizzle/schema"
import { nodeTypes } from "../../nodes"
import { useSaveWorkspaceGraph } from "../../hooks/use-update-worklfow"
import { Button } from "@/components/ui/button"
import { MessageCircle, Save, X } from "lucide-react"
import { toast } from "sonner"
import { WorkflowChatPanel } from "@/modules/chat/ui/components/chat-panel"

const initialNodes: StepNodeType[] = [
  {
    id: "start-1",
    type: "start",
    position: { x: 0, y: 0 },
    data: { kind: "start" },
  },
]
const initialEdges: Edge[] = []

function Canvas({
  initialGraph,
  id,
}: {
  initialGraph?: WorkflowGraph
  id: string
}) {
  const { mutate: saveGraph, isPending } = useSaveWorkspaceGraph(id)
    const [showChat, setShowChat] = useState(false)

  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, onDelete } =
    useLiveblocksFlow({
      suspense: true,
      nodes: {
        initial: initialGraph?.nodes ?? initialNodes,
      },
      edges: {
        initial: initialGraph?.edges ?? initialEdges,
      },
    })
  const handleSave = () => {
    saveGraph(
      { nodes: nodes as StepNodeType[], edges },
      {
        onSuccess: () => {
          toast.success("workflow save successfully")
        },
      }
    )
  }
const agentNode = nodes.find((n) => n.type === "agent")
const toggleChat = () => {
  setShowChat((prev) => !prev);
};
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <NodeSidebar />
      <div className="flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onDelete={onDelete}
          deleteKeyCode={"Delete"}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          proOptions={{
            hideAttribution: true,
          }}
        >
          <Cursors />
          <Panel position="top-right">
            <AvatarStack />
             
          </Panel>
          <Panel>
            <Button onClick={toggleChat}>
  {showChat ? "Hide Chat" : "Show Chat"}
</Button>
          </Panel>
          <Panel position="bottom-center">
            <Button
              size="lg"
              onClick={handleSave}
              disabled={isPending}
              className="gap-1.5"
            >
              <Save className="h-3.5 w-3.5" />
              {isPending ? "Saving..." : "Save"}
            </Button>
          </Panel>
          <Background gap={12} size={1} />
          <Controls className="text-black" />
       
        </ReactFlow>
      </div>
      {/* ← this whole block was missing — nothing rendered the panel */}
       {showChat && (
    <WorkflowChatPanel
    nodes={nodes as StepNodeType[]}
    edges={edges}
    onClose={() => setShowChat(false)}
  />
  )}
     
    </div>
  )
}

export function FlowCanvas(props: {
  id: string
  initialGraph?: WorkflowGraph
}) {
  return (
    <ReactFlowProvider>
      <Canvas {...props} />
    </ReactFlowProvider>
  )
}
