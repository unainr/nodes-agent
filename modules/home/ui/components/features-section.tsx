// components/marketing/features-section.tsx
"use client"

import { Bot, GitBranch, Users, Zap, Lock, Globe } from "lucide-react"
import { motion } from "motion/react"

const features = [
  {
    icon: Bot,
    color: "bg-violet-500",
    title: "Agents that call real tools",
    description:
      "Connect an Agent node to an HTTP Request step and it can act, not just answer.",
  },
  {
    icon: GitBranch,
    color: "bg-amber-500",
    title: "Branch on your own logic",
    description:
      "Condition nodes route the workflow based on what happened in the step before.",
  },
  {
    icon: Users,
    color: "bg-emerald-500",
    title: "Build with your team, live",
    description:
      "See everyone's cursor moving on the same canvas, in the same moment.",
  },
  {
    icon: Zap,
    color: "bg-sky-500",
    title: "Test before you ship",
    description:
      "Chat with the workflow directly on the canvas — no separate staging step.",
  },
  {
    icon: Lock,
    color: "bg-rose-500",
    title: "Scoped to your organization",
    description:
      "Every workspace, workflow, and run stays inside your org — nothing crosses over.",
  },
  {
    icon: Globe,
    color: "bg-indigo-500",
    title: "Any model behind the scenes",
    description:
      "Swap the model running your agents without touching a single node.",
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

export function FeaturesSection() {
  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-xl text-center"
        >
          <h2 className="text-3xl font-semibold capitalize tracking-tight text-foreground sm:text-4xl">
            Everything a workflow needs{" "}
            <span className="text-[#0070FF]">nothing it doesn't</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Six node types. One canvas. No separate tools for building, testing,
            and running.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${feature.color}`}
              >
                <feature.icon className="h-5 w-5 text-white" />
              </span>
              <h3 className="mt-4 text-sm font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
