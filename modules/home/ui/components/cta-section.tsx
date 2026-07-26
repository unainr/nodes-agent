// components/marketing/cta-section.tsx
"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CtaSection() {
  return (
    <section className="relative overflow-hidden border-t border-border bg-background py-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="pointer-events-none absolute top-0 left-1/2 h-75 w-150 -translate-x-1/2 rounded-full bg-violet-500/10 blur-[120px]"
      />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="relative mx-auto max-w-2xl px-6 text-center"
      >
        <h2 className="text-3xl font-semibold tracking-tight text-foreground capitalize sm:text-4xl">
          Your first workflow is{" "}
          <span className="text-[#0070FF]">free to build</span>
        </h2>
        <p className="mt-4 text-muted-foreground">
          One workspace, real agents, no card required.
        </p>
        <div className="mt-8">
          <Button asChild size="lg" variant="primary" className="gap-2">
            <Link href="/sign-up">
              Start building free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </motion.div>
    </section>
  )
}
