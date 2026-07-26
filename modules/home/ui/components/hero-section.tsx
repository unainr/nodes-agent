// components/marketing/hero-section.tsx
"use client"

import Link from "next/link"
import { useMemo } from "react"
import { Handle, Position } from "@xyflow/react"

import {
  ArrowRight,
  Play,
  Bot,
  GitBranch,
  Globe,
  Flag,
  MousePointer2,
  ChevronDown,
  Folder,
  Plus,
} from "lucide-react"
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  type NodeTypes,
  type Node,
  type Edge,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { Button } from "@/components/ui/button"

// components/marketing/hero-section.tsx (only the changed parts shown below — rest of file stays as-is)

function PillNode({
  icon: Icon,
  label,
  color,
}: {
  icon: any
  label: string
  color: string
}) {
  return (
    <div className="relative flex items-center gap-3 rounded-full border border-border bg-card px-5 py-3.5 shadow-lg">
      <Handle type="target" position={Position.Left} className="opacity-0" />
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-lg ${color}`}
      >
        <Icon className="h-4.5 w-4.5 text-white" />
      </span>
      <span className="text-base font-medium text-foreground">{label}</span>
      <Handle type="source" position={Position.Right} className="opacity-0" />
    </div>
  )
}

function CardNode({
  icon: Icon,
  label,
  sublabel,
  color,
}: {
  icon: any
  label: string
  sublabel: string
  color: string
}) {
  return (
    <div className="relative w-60 rounded-xl border border-border bg-card shadow-xl">
      <Handle type="target" position={Position.Left} className="opacity-0" />
      <div className="flex items-center gap-3 px-4 py-3.5">
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${color}`}
        >
          <Icon className="h-5 w-5 text-white" />
        </span>
        <span className="text-base font-semibold text-foreground">{label}</span>
      </div>
      <div className="border-t border-border px-4 py-3">
        <div className="rounded-md border border-border bg-background px-3 py-2 text-sm text-muted-foreground">
          {sublabel}
        </div>
      </div>
      <Handle type="source" position={Position.Right} className="opacity-0" />
    </div>
  )
}

function NoteNode({ text }: { text: string }) {
  return (
    <div className="w-52 rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-3.5">
      <p className="text-sm leading-snug text-yellow-100/90">{text}</p>
    </div>
  )
}

const nodeTypes: NodeTypes = {
  start: () => <PillNode icon={Play} label="Start" color="bg-emerald-500" />,
  agent: () => (
    <CardNode
      icon={Bot}
      label="AI Agent"
      sublabel="gpt-4o-mini"
      color="bg-violet-500"
    />
  ),
  condition: () => (
    <PillNode icon={GitBranch} label="Condition" color="bg-amber-500" />
  ),
  http: () => (
    <CardNode
      icon={Globe}
      label="HTTP Request"
      sublabel="POST /webhook"
      color="bg-sky-500"
    />
  ),
  end: () => <PillNode icon={Flag} label="End" color="bg-rose-500" />,
  note: () => <NoteNode text="Retry twice before escalating to a human." />,
}

// Tighter, single-direction layout — flows left to right in one clean band,
// no node sits close enough to the right edge to clip under fitView.
const initialNodes: Node[] = [
  {
    id: "1",
    type: "start",
    position: { x: 0, y: 180 },
    data: {},
    draggable: false,
    selectable: false,
  },
  {
    id: "2",
    type: "agent",
    position: { x: 170, y: 100 },
    data: {},
    draggable: false,
    selectable: false,
  },
  {
    id: "3",
    type: "condition",
    position: { x: 440, y: 180 },
    data: {},
    draggable: false,
    selectable: false,
  },
  {
    id: "4",
    type: "http",
    position: { x: 610, y: 40 },
    data: {},
    draggable: false,
    selectable: false,
  },
  {
    id: "5",
    type: "agent",
    position: { x: 610, y: 280 },
    data: {},
    draggable: false,
    selectable: false,
  },
  {
    id: "6",
    type: "condition",
    position: { x: 850, y: 160 },
    data: {},
    draggable: false,
    selectable: false,
  },
  {
    id: "7",
    type: "end",
    position: { x: 1050, y: 80 },
    data: {},
    draggable: false,
    selectable: false,
  },
  {
    id: "8",
    type: "end",
    position: { x: 1050, y: 260 },
    data: {},
    draggable: false,
    selectable: false,
  },
  {
    id: "9",
    type: "note",
    position: { x: 400, y: 400 },
    data: {},
    draggable: false,
    selectable: false,
  },
]

const initialEdges: Edge[] = [
  {
    id: "e1",
    source: "1",
    target: "2",
    animated: true,
    style: { stroke: "#10b981", strokeWidth: 3 },
  },
  {
    id: "e2",
    source: "2",
    target: "3",
    animated: true,
    style: { stroke: "#8b5cf6", strokeWidth: 3 },
  },
  {
    id: "e3",
    source: "3",
    target: "4",
    animated: true,
    style: { stroke: "#f59e0b", strokeWidth: 3 },
  },
  {
    id: "e4",
    source: "3",
    target: "5",
    animated: true,
    style: { stroke: "#f59e0b", strokeWidth: 3 },
  },
  {
    id: "e5",
    source: "4",
    target: "6",
    animated: true,
    style: { stroke: "#0ea5e9", strokeWidth: 3 },
  },
  {
    id: "e6",
    source: "5",
    target: "6",
    animated: true,
    style: { stroke: "#8b5cf6", strokeWidth: 3 },
  },
  {
    id: "e7",
    source: "6",
    target: "7",
    animated: true,
    style: { stroke: "#f59e0b", strokeWidth: 3 },
  },
  {
    id: "e8",
    source: "6",
    target: "8",
    animated: true,
    style: { stroke: "#f59e0b", strokeWidth: 3 },
  },
]

const workflowList = [
  { name: "Support triage", active: true },
  { name: "Lead qualification", active: false },
  { name: "Invoice follow-up", active: false },
  { name: "Onboarding emails", active: false },
  { name: "Refund requests", active: false },
]

const cursors = [
  {
    name: "Amara",
    color: "#10b981",
    top: "18%",
    left: "14%",
    duration: "10s",
    delay: "0s",
  },
  {
    name: "Theo",
    color: "#8b5cf6",
    top: "62%",
    left: "38%",
    duration: "13s",
    delay: "1.5s",
  },
  {
    name: "Priya",
    color: "#f59e0b",
    top: "72%",
    left: "68%",
    duration: "11s",
    delay: "3s",
  },
  {
    name: "Kenji",
    color: "#0ea5e9",
    top: "28%",
    left: "60%",
    duration: "14s",
    delay: "0.8s",
  },
  {
    name: "Noor",
    color: "#f43f5e",
    top: "45%",
    left: "82%",
    duration: "12s",
    delay: "2.2s",
  },
]

export function HeroSection() {
  const stars = useMemo(
    () =>
      Array.from({ length: 60 }).map(() => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() > 0.85 ? 2 : 1,
        delay: `${Math.random() * 6}s`,
      })),
    []
  )

  return (
    <section className="relative overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-130 overflow-hidden">
        {stars.map((star, i) => (
          <span
            key={i}
            className="absolute animate-[twinkle_5s_ease-in-out_infinite] rounded-full bg-white/70"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              animationDelay: star.delay,
            }}
          />
        ))}
        <div className="absolute top-0 -left-40 h-105 w-105 rounded-full bg-violet-500/10 blur-[130px]" />
        <div className="absolute top-10 -right-40 h-95 w-95 rounded-full bg-emerald-500/10 blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 pt-28 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
          Now with real-time collaborative canvases
          <ArrowRight className="h-3 w-3" />
        </div>
        <h1 className="text-4xl leading-[1.05] font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          An agent that actually <span className="text-[#0070FF]">does the work.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
          Give it a job, a way to check its own logic, and the tools to follow
          through then watch it run, live, with your whole team in the room.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" variant="primary" className="gap-2">
            <Link href="/sign-up">
              Start building free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="bg-card/60 backdrop-blur"
          >
            <Link href="/pricing">See pricing</Link>
          </Button>
        </div>
      </div>

      <div className="relative mx-auto mt-16 max-w-6xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
          <div className="flex items-center gap-1.5 border-b border-border bg-muted/30 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
          </div>

          <div className="flex h-135">
            <div className="hidden w-56 shrink-0 flex-col border-r border-border bg-background/60 p-3 sm:flex">
              <div className="mb-4 flex items-center justify-between rounded-md border border-border bg-card px-2.5 py-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded bg-violet-500 text-[10px] font-bold text-white">
                    S
                  </span>
                  <span className="text-xs font-medium text-foreground">
                    Seerforge Inc
                  </span>
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              </div>

              <div className="mb-1.5 flex items-center justify-between px-1">
                <p className="text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
                  Workspaces
                </p>
                <Plus className="h-3 w-3 text-muted-foreground" />
              </div>
              <div className="flex flex-col gap-0.5">
                {workflowList.map((w) => (
                  <div
                    key={w.name}
                    className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-xs ${
                      w.active
                        ? "bg-sidebar-accent text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    <Folder className="h-3.5 w-3.5" />
                    <span className="truncate">{w.name}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto rounded-md border border-dashed border-border px-2.5 py-2">
                <p className="text-[10px] font-medium text-foreground">
                  Free plan
                </p>
                <p className="mt-0.5 text-[10px] text-muted-foreground">
                  1 of 1 workspace used
                </p>
              </div>
            </div>

            <div className="relative flex-1 overflow-hidden">
              <ReactFlowProvider>
                <ReactFlow
                  nodes={initialNodes}
                  edges={initialEdges}
                  nodeTypes={nodeTypes}
                  fitView
                  fitViewOptions={{
                    padding: 0.25,
                    minZoom: 0.35,
                    maxZoom: 0.95,
                  }}
                  defaultEdgeOptions={{
                    type: "smoothstep",
                    style: { strokeWidth: 3 },
                  }}
                  panOnDrag={false}
                  zoomOnScroll={false}
                  zoomOnPinch={false}
                  zoomOnDoubleClick={false}
                  nodesConnectable={false}
                  proOptions={{ hideAttribution: true }}
                >
                  <Background gap={16} size={1} />
                </ReactFlow>
              </ReactFlowProvider>

              {cursors.map((cursor) => (
                <div
                  key={cursor.name}
                  className="pointer-events-none absolute z-10 animate-[cursor-roam_var(--dur)_ease-in-out_infinite]"
                  style={{
                    top: cursor.top,
                    left: cursor.left,
                    // @ts-expect-error custom property
                    "--dur": cursor.duration,
                    animationDelay: cursor.delay,
                  }}
                >
                  <MousePointer2
                    className="h-4 w-4 drop-shadow"
                    style={{ color: cursor.color, fill: cursor.color }}
                  />
                  <span
                    className="mt-0.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium text-white shadow-md"
                    style={{ backgroundColor: cursor.color }}
                  >
                    {cursor.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.9;
          }
        }
        @keyframes cursor-roam {
          0% {
            transform: translate(0, 0);
            opacity: 0;
          }
          8% {
            opacity: 1;
          }
          25% {
            transform: translate(60px, 45px);
          }
          50% {
            transform: translate(15px, 85px);
          }
          75% {
            transform: translate(-35px, 25px);
          }
          92% {
            opacity: 1;
          }
          100% {
            transform: translate(0, 0);
            opacity: 0;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          [class*="animate-"] {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  )
}
