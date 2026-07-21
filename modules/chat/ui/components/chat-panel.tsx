// modules/workflows/ui/components/workflow-chat-panel.tsx
"use client"

import { useEffect, useRef, useState } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { X, Send, Bot, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import type { Edge } from "@xyflow/react"
import { StepNodeType } from "@/modules/workflows/nodes/node-types"

interface Props {
  nodes: StepNodeType[]
  edges: Edge[]
  onClose: () => void
}

export function WorkflowChatPanel({ nodes, edges, onClose }: Props) {
  const [input, setInput] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null)

  const hasAgent = nodes.some((n) => n.type === "agent")
  const agentNode = nodes.find((n) => n.type === "agent")
  const agentModel =
    agentNode?.type === "agent"
      ? (agentNode.data as { model: string }).model
      : undefined

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: `/api/chat`,
      body: { nodes, edges },
    }),
  })

  const isLoading = status === "submitted" || status === "streaming"

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, status])

  return (
    <div className="absolute top-16 right-4 z-20 flex h-130 w-80 flex-col overflow-hidden rounded-xl border border-border bg-card shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-muted/40 px-3 py-2.5">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarFallback className="bg-violet-500">
              <Bot className="h-3.5 w-3.5 text-white" />
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-xs leading-none font-semibold">Test workflow</p>
            {hasAgent ? (
              <p className="mt-0.5 text-[10px] text-muted-foreground">
                {agentModel}
              </p>
            ) : (
              <p className="mt-0.5 text-[10px] text-muted-foreground">
                No agent connected
              </p>
            )}
          </div>
        </div>
        <Button
          size="icon"
          variant="ghost"
          className="h-6 w-6"
          onClick={onClose}
        >
          <X className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="min-h-0 flex-1">
        <div className="space-y-3 p-3">
          {!hasAgent && (
            <div className="flex flex-col items-center gap-1.5 rounded-lg border border-dashed border-border px-3 py-6 text-center">
              <Bot className="h-5 w-5 text-muted-foreground" />
              <p className="text-xs font-medium">No agent node yet</p>
              <p className="text-[11px] text-muted-foreground">
                Add an Agent node to the canvas to test it here.
              </p>
            </div>
          )}

          {hasAgent && messages.length === 0 && (
            <div className="flex flex-col items-center gap-1.5 rounded-lg border border-dashed border-border px-3 py-6 text-center">
              <Sparkles className="h-5 w-5 text-muted-foreground" />
              <p className="text-xs font-medium">Ready to test</p>
              <p className="text-[11px] text-muted-foreground">
                Send a message to see how this workflow responds.
              </p>
            </div>
          )}

          {messages.map((m) => (
            <div
              key={m.id}
              className={cn(
                "flex items-end gap-1.5",
                m.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {m.role !== "user" && (
                <Avatar className="h-5 w-5 shrink-0">
                  <AvatarFallback className="bg-violet-500">
                    <Bot className="h-3 w-3 text-white" />
                  </AvatarFallback>
                </Avatar>
              )}

              <span
                className={cn(
                  "max-w-[80%] rounded-2xl px-3 py-1.5 text-xs leading-relaxed whitespace-pre-wrap",
                  m.role === "user"
                    ? "rounded-br-sm bg-primary text-primary-foreground"
                    : "rounded-bl-sm bg-muted text-foreground"
                )}
              >
                {m.parts.map((part, i) => {
                  if (part.type === "text")
                    return <span key={i}>{part.text}</span>
                  if (part.type.startsWith("tool-")) {
                    return (
                      <div
                        key={i}
                        className="mt-1 rounded-md border border-border bg-background/50 px-2 py-1 text-[10px] text-muted-foreground"
                      >
                        🔧 Called an action step
                      </div>
                    )
                  }
                  return null
                })}
              </span>
            </div>
          ))}

          {status === "submitted" && (
            <div className="flex items-end gap-1.5">
              <Avatar className="h-5 w-5 shrink-0">
                <AvatarFallback className="bg-violet-500">
                  <Bot className="h-3 w-3 text-white" />
                </AvatarFallback>
              </Avatar>
              <span className="flex gap-1 rounded-2xl rounded-bl-sm bg-muted px-3 py-2">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" />
              </span>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      {/* Composer */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (input.trim() && hasAgent) {
            sendMessage({ text: input })
            setInput("")
          }
        }}
        className="flex items-center gap-1.5 border-t border-border p-2"
      >
        <Input
          className="h-8 rounded-full text-xs"
          placeholder={
            hasAgent ? "Type a message..." : "Add an agent node first"
          }
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading || !hasAgent}
        />
        <Button
          size="icon"
          type="submit"
          className="h-8 w-8 shrink-0 rounded-full"
          disabled={isLoading || !hasAgent || !input.trim()}
        >
          <Send className="h-3.5 w-3.5" />
        </Button>
      </form>
    </div>
  )
}
