// modules/workflows/ui/components/workflow-chat-panel.tsx
"use client"

import { useEffect, useRef, useState } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { X, Send, Bot, Sparkles, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import type { Edge } from "@xyflow/react"
import { StepNodeType } from "@/modules/workflows/nodes/node-types"
import { toast } from "sonner"
// modules/workflows/ui/components/workflow-chat-panel.tsx (add these imports)
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Smile } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import EmojiPicker, { Theme } from "emoji-picker-react"
interface Props {
  nodes: StepNodeType[]
  edges: Edge[]
  onClose: () => void
}

export function WorkflowChatPanel({ nodes, edges, onClose }: Props) {
  const [input, setInput] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null)
  const [limitReached, setLimitReached] = useState(false)
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
      fetch: async (input, init) => {
        const response = await fetch(input, init)

        if (response.status === 403) {
          const body = await response
            .clone()
            .json()
            .catch(() => null)
          setLimitReached(true)
          toast.error(
            body?.message ??
              "Monthly AI test run limit reached — upgrade to continue testing."
          )
        }

        return response
      },
    }),
    onError: () => {
      if (!limitReached) toast.error("Something went wrong")
    },
  })

  const isLoading = status === "submitted" || status === "streaming"
  const isDisabled = isLoading || !hasAgent || limitReached

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
              <p className="mt-0.5 text-[10px] text-muted-foreground">{agentModel}</p>
            ) : (
              <p className="mt-0.5 text-[10px] text-muted-foreground">No agent connected</p>
            )}
          </div>
        </div>
        <Button size="icon" variant="ghost" className="h-6 w-6" onClick={onClose}>
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
              <p className="text-[11px] text-muted-foreground">Add an Agent node to the canvas to test it here.</p>
            </div>
          )}

          {hasAgent && messages.length === 0 && !limitReached && (
            <div className="flex flex-col items-center gap-1.5 rounded-lg border border-dashed border-border px-3 py-6 text-center">
              <Sparkles className="h-5 w-5 text-muted-foreground" />
              <p className="text-xs font-medium">Ready to test</p>
              <p className="text-[11px] text-muted-foreground">Send a message to see how this workflow responds.</p>
            </div>
          )}

          {messages.map((m) => (
            <div key={m.id} className={cn("flex items-end gap-1.5", m.role === "user" ? "justify-end" : "justify-start")}>
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
                  m.role === "user" ? "rounded-br-sm bg-primary text-primary-foreground" : "rounded-bl-sm bg-muted text-foreground",
                )}
              >
                {m.parts.map((part, i) => {
                  if (part.type === "text") {
                    if (m.role === "user") {
                      return <span key={i}>{part.text}</span>
                    }
                    return (
                      <div
                        key={i}
                        className="[&_p]:m-0 [&_p+p]:mt-2 [&_ul]:my-1 [&_ul]:pl-4 [&_ol]:my-1 [&_ol]:pl-4 [&_li]:my-0.5 [&_strong]:font-semibold [&_code]:rounded [&_code]:bg-background/60 [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-[10px] [&_pre]:my-1.5 [&_pre]:overflow-x-auto [&_pre]:rounded-md [&_pre]:bg-background/70 [&_pre]:p-2 [&_a]:text-primary [&_a]:underline"
                      >
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{part.text}</ReactMarkdown>
                      </div>
                    )
                  }
                  if (part.type.startsWith("tool-")) {
                    return (
                      <div key={i} className="mt-1 rounded-md border border-border bg-background/50 px-2 py-1 text-[10px] text-muted-foreground">
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

          {limitReached && (
            <div className="flex flex-col items-center gap-1.5 rounded-lg border border-dashed border-amber-300 bg-amber-50 px-3 py-4 text-center dark:border-amber-500/30 dark:bg-amber-500/10">
              <Lock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              <p className="text-xs font-medium text-amber-900 dark:text-amber-200">Monthly limit reached</p>
              <p className="text-[11px] text-amber-700 dark:text-amber-300/80">You've used all your free AI test runs this month.</p>
              <Button size="sm" variant="outline" className="mt-1 h-7 text-xs" asChild>
                <a href="/pricing">Upgrade to Pro</a>
              </Button>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      {/* Composer */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (input.trim() && !isDisabled) {
            sendMessage({ text: input })
            setInput("")
          }
        }}
        className="flex items-center gap-1.5 border-t border-border p-2"
      >
        <Popover>
          <PopoverTrigger asChild>
            <Button type="button" size="icon" variant="ghost" className="h-8 w-8 shrink-0 rounded-full" disabled={isDisabled}>
              <Smile className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent side="top" align="start" className="w-auto border-none p-0">
            <EmojiPicker
              theme={Theme.AUTO}
              onEmojiClick={(emojiData) => setInput((prev) => prev + emojiData.emoji)}
              width={280}
              height={360}
              previewConfig={{ showPreview: false }}
              searchDisabled={false}
            />
          </PopoverContent>
        </Popover>

        <Input
          className="h-8 rounded-full text-xs"
          placeholder={limitReached ? "Upgrade to continue testing" : hasAgent ? "Type a message..." : "Add an agent node first"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isDisabled}
        />
        <Button size="icon" type="submit" className="h-8 w-8 shrink-0 rounded-full" disabled={isDisabled || !input.trim()}>
          <Send className="h-3.5 w-3.5" />
        </Button>
      </form>
    </div>
  )
}
