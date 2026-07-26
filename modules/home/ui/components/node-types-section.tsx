// components/marketing/node-types-section.tsx
"use client"

import { motion } from "framer-motion"
import { Play, Bot, GitBranch, Globe, Flag, StickyNote } from "lucide-react"

const nodeTypes = [
  { icon: Play, color: "bg-emerald-500", name: "Start", description: "Where every run begins." },
  { icon: Bot, color: "bg-violet-500", name: "Agent", description: "Runs a model against your instructions and the conversation so far." },
  { icon: GitBranch, color: "bg-amber-500", name: "Condition", description: "Checks what just happened and picks the next path." },
  { icon: Globe, color: "bg-sky-500", name: "HTTP Request", description: "Calls a real endpoint and hands the response back to the workflow." },
  { icon: Flag, color: "bg-rose-500", name: "End", description: "Marks where a run finishes and what it hands back." },
  { icon: StickyNote, color: "bg-yellow-500", name: "Note", description: "Leaves context for the next person who opens the canvas." },
]

export function NodeTypesSection() {
  return (
    <section className="border-t border-border bg-background py-24">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-5xl text-center"
        >
          <h2 className="text-3xl font-semibold capitalize tracking-tight text-foreground sm:text-4xl">
            Six pieces any <span className="text-[#0070FF]">shape workflow</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            No hidden logic every step in a run is one of these, sitting right on the canvas.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {nodeTypes.map((node, i) => (
            <motion.div
              key={node.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              whileHover={{ y: -3 }}
              className="rounded-xl border border-border bg-card p-5"
            >
              <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${node.color}`}>
                <node.icon className="h-4.5 w-4.5 text-white" />
              </span>
              <h3 className="mt-3 text-sm font-semibold text-foreground">{node.name}</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{node.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}