// features/workflows/flow-canvas.tsx
"use client"

import { useCallback, useState } from "react"
import {
  ReactFlow, ReactFlowProvider, Background, Controls,
  applyNodeChanges, applyEdgeChanges, addEdge,
} from "@xyflow/react"
import type { Edge, OnNodesChange, OnEdgesChange, OnConnect } from "@xyflow/react"
import "@xyflow/react/dist/style.css"

import { NodeSidebar } from "./node-sidebar"
import { StepNodeType } from "../../nodes/node-types"
import { WorkflowGraph } from "@/drizzle/schema"
import { nodeTypes } from "../../nodes"

const initialNodes: StepNodeType[] = [
  { id: "start-1", type: "start", position: { x: 0, y: 0 }, data: { kind: "start" } },
]
const initialEdges: Edge[] = []

function Canvas({ initialGraph }: { initialGraph?: WorkflowGraph }) {
  const [nodes, setNodes] = useState<StepNodeType[]>(initialGraph?.nodes ?? initialNodes)
  const [edges, setEdges] = useState<Edge[]>(initialGraph?.edges ?? initialEdges)

  const onNodesChange: OnNodesChange<StepNodeType> = useCallback(
    (changes) => setNodes((snapshot) => applyNodeChanges(changes, snapshot)),
    [],
  )
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((snapshot) => applyEdgeChanges(changes, snapshot)),
    [],
  )
  const onConnect: OnConnect = useCallback(
    (params) => setEdges((snapshot) => addEdge(params, snapshot)),
    [],
  )

  return (
    <div className="flex h-screen w-screen">
      <NodeSidebar />
      <div className="flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          proOptions={{
						hideAttribution: true,
					}}
        >
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