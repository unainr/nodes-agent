// components/marketing/faq-section.tsx
"use client"

import { motion } from "framer-motion"
import * as React from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    q: "What counts as a workspace?",
    a: "A workspace holds one canvas — its nodes, edges, and the graph you save. The Free plan includes one; Pro removes the limit.",
  },
  {
    q: "What model actually runs my agents?",
    a: "You pick a label per Agent node; the underlying model can change without touching your workflow.",
  },
  {
    q: "Can more than one person edit at the same time?",
    a: "Yes — every workspace is a live, collaborative canvas. You'll see teammates' cursors moving as they work.",
  },
  {
    q: "Can an Agent node call an external API?",
    a: "Yes, if it's connected to an HTTP Request node, an Agent can call it as a tool during a conversation.",
  },
  {
    q: "What happens if I hit my monthly AI test run limit?",
    a: "The test panel locks with a clear upgrade prompt — your saved workflow itself is never affected.",
  },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="border-b border-border py-5">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="text-sm font-medium text-foreground">{q}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <p className="pt-3 text-sm leading-relaxed text-muted-foreground">
          {a}
        </p>
      </motion.div>
    </div>
  )
}

export function FaqSection() {
  return (
    <section className="border-t border-border bg-background py-24">
      <div className="mx-auto max-w-2xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center text-3xl font-semibold tracking-tight text-foreground capitalize"
        >
          Questions <span className="text-[#0070FF]">answered</span>
        </motion.h2>

        <div className="mt-12">
          {faqs.map((faq) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </div>
    </section>
  )
}
