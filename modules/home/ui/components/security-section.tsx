// components/marketing/security-section.tsx
"use client"

import { motion } from "framer-motion"
import { ShieldCheck, Building2, KeyRound } from "lucide-react"

const points = [
  { icon: Building2, title: "One org, one boundary", description: "Every workspace, workflow, and run belongs to a single organization — nothing crosses over, ever." },
  { icon: KeyRound, title: "Checked on every request", description: "Access is verified server-side on each call, not assumed from what the page shows you." },
  { icon: ShieldCheck, title: "Built to fail closed", description: "If something can't be confirmed as yours, you get a clear 'not found' — not a guess." },
]

export function SecuritySection() {
  return (
    <section className="border-t border-border bg-background py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl capitalize font-semibold tracking-tight text-foreground sm:text-4xl">
              Your workspace <span className="text-[#0070FF]">
                 is yours
                </span>
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              Multi-tenant by design every workflow is scoped to your organization at the database layer, not just hidden in the interface.
            </p>
          </motion.div>

          <div className="space-y-5">
            {points.map((point, i) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-start gap-4 rounded-xl border border-border bg-card p-4"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15">
                  <point.icon className="h-4.5 w-4.5 text-emerald-500" />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{point.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{point.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}