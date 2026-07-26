// app/pricing/page.tsx
import { PricingTable } from "@clerk/nextjs"
import { Sparkles } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pricing - Seerforge",
  description:
    "Simple, org-based pricing that scales with your team. Start free with one workspace, upgrade when you need more room to build.",
}
const PricingPage = () => {
  return (
    <section className="relative overflow-hidden bg-background py-24">
      {/* same ambient glow language as the hero, kept subtle here */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 -left-40 h-105 w-105 rounded-full bg-violet-500/10 blur-[130px]" />
        <div className="absolute top-20 -right-40 h-95 w-95 rounded-full bg-emerald-500/10 blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6">
        <div className="mx-auto max-w-xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <Sparkles className="h-3 w-3 text-blue-500" />
            Simple, org-based pricing
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-foreground capitalize sm:text-4xl">
            Pricing that scales{" "}
            <span className="text-[#0070FF]">with your team</span>
          </h1>
          <p className="mt-3 text-muted-foreground">
            Start free with one workspace. Upgrade when your team needs more
            room to build.
          </p>
        </div>

        <div className="mt-14">
          <PricingTable for="organization"  />
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          No credit card required on the free plan · Cancel anytime
        </p>
      </div>
    </section>
  )
}

export default PricingPage
