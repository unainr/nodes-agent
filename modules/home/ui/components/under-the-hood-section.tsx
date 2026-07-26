// components/marketing/under-the-hood-section.tsx
"use client"

import { motion } from "framer-motion"
import { MessageSquare, Bot, Wrench, CheckCircle2 } from "lucide-react"

const lifecycle = [
  { icon: MessageSquare, color: "text-sky-500", label: "A message comes in", detail: "Through the test panel, or wherever the workflow is triggered from." },
  { icon: Bot, color: "text-violet-500", label: "The agent reads the graph", detail: "Every connected node's instructions become one system prompt, in order." },
  { icon: Wrench, color: "text-amber-500", label: "It can call a real step", detail: "An HTTP Request node becomes a tool the model can actually use." },
  { icon: CheckCircle2, color: "text-emerald-500", label: "You see the result", detail: "Streamed back in real time, with each tool call visible in the thread." },
]

export function UnderTheHoodSection() {
  return (
    <section className="border-t border-border bg-background py-24">
      <div className="mx-auto max-w-3xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center text-3xl capitalize font-semibold tracking-tight text-foreground sm:text-4xl"
        >
          What happens when <span className="text-[#0070FF]">
            you hit send
            </span>
        </motion.h2>

        <div className="mt-14 space-y-3">
          {lifecycle.map((step, i) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-center gap-4 rounded-xl border border-border bg-card p-4"
            >
              <step.icon className={`h-5 w-5 shrink-0 ${step.color}`} />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{step.label}</p>
                <p className="text-xs text-muted-foreground">{step.detail}</p>
              </div>
              <span className="text-xs font-mono text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}