import React from 'react'
import { HeroSection } from '../components/hero-section'
import { FeaturesSection } from '../components/features-section'
import { HowItWorksSection } from '../components/how-it-works-section'
import { CtaSection } from '../components/cta-section'
import { FaqSection } from '../components/faq-section'
import { NodeTypesSection } from '../components/node-types-section'
import { SecuritySection } from '../components/security-section'
import { UnderTheHoodSection } from '../components/under-the-hood-section'

export const HomeView = () => {
  return (
    <>
      <HeroSection />
      <NodeTypesSection />
      <FeaturesSection />
      <UnderTheHoodSection />
      <SecuritySection />
      <HowItWorksSection />
      <FaqSection />
      <CtaSection />
    </>
  )
}
