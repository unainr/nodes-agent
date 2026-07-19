// features/workflows/flow-canvas.tsx
"use client"

import { useCallback, useState } from "react"
import {
  ReactFlow, ReactFlowProvider, Background, Controls,
  Panel
} from "@xyflow/react"
import type { Edge } from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import {AvatarStack} from "@liveblocks/react-ui"
import "@liveblocks/react-ui/styles.css";
import "@liveblocks/react-flow/styles.css";
import { useLiveblocksFlow, Cursors } from "@liveblocks/react-flow";

import { NodeSidebar } from "./node-sidebar"
import { StepNodeType } from "../../nodes/node-types"
import { WorkflowGraph } from "@/drizzle/schema"
import { nodeTypes } from "../../nodes"

const initialNodes: StepNodeType[] = [
  { id: "start-1", type: "start", position: { x: 0, y: 0 }, data: { kind: "start" } },
]
const initialEdges: Edge[] = []

function Canvas({ initialGraph }: { initialGraph?: WorkflowGraph }) {


const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onDelete,
  } = useLiveblocksFlow({
    suspense: true,
    nodes: {
      initial: initialGraph?.nodes??initialNodes,
    },
    edges: {
      initial: initialGraph?.edges??initialEdges,
    },
  });


  return (
    <div className="flex h-screen w-full overflow-hidden">
      <NodeSidebar />
      <div className="flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onDelete={onDelete}
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
            <AvatarStack/>

           </Panel>
        <Background gap={12} size={1} />
        	<Controls className="text-black" />
        </ReactFlow>
      </div>
    </div>
  )
}

export function FlowCanvas(props: { initialGraph?: WorkflowGraph }) {
  return (
    <ReactFlowProvider>
      <Canvas {...props} />
    </ReactFlowProvider>
  )
}