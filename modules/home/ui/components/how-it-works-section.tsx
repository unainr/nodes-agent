// components/marketing/how-it-works-section.tsx
"use client"

import { motion } from "framer-motion"
import { MousePointerClick, Link2, MessageCircle } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: MousePointerClick,
    color: "text-emerald-500",
    title: "Drop nodes on the canvas",
    description:
      "Start, Agent, Condition, HTTP Request, End — click any of them into place.",
  },
  {
    number: "02",
    icon: Link2,
    color: "text-violet-500",
    title: "Connect the path",
    description:
      "Draw edges between nodes to define what happens after each step.",
  },
  {
    number: "03",
    icon: MessageCircle,
    color: "text-amber-500",
    title: "Chat with it, live",
    description:
      "Open the test panel and talk to the workflow exactly as a user would.",
  },
]

export function HowItWorksSection() {
  return (
    <section className="border-t border-border bg-background py-24">
      <div className="mx-auto max-w-5xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center text-3xl capitalize font-semibold tracking-tight text-foreground sm:text-4xl"
        >
          From empty canvas{" "}
          <span className="text-[#0070FF]">to working agent</span>
        </motion.h2>

        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative"
            >
              <span className="text-5xl font-bold text-border">
                {step.number}
              </span>
              <step.icon className={`mt-4 h-6 w-6 ${step.color}`} />
              <h3 className="mt-3 text-base font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
