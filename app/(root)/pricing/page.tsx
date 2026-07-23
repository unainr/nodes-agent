import { PricingTable } from '@clerk/nextjs'
import React from 'react'

const PricingPage = () => {
  return (
   <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold">Pricing</h1>
        <p className="mt-2 text-muted-foreground">Simple pricing that scales with your team.</p>
      <PricingTable  for="organization"  />
      </div>
    </div>
  )
}

export default PricingPage