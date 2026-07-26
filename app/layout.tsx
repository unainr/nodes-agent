import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import QueryProviders from "@/providers/query-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ClerkProvider } from "@clerk/nextjs"
import { Toaster } from "@/components/pebble-toast"
import { shadcn } from "@clerk/ui/themes"
import type { Metadata } from "next";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})


export const metadata: Metadata = {
  title: "Seerforge - Build AI Agent Workflows Your Team Can See",
  description:
    "Seerforge is a visual, collaborative workflow builder for AI agents. Drag on a Start, an Agent, a Condition, connect them, and test the whole thing in a live chat with your team watching in real time.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <ClerkProvider
        appearance={{
          theme: shadcn,
          variables: {
            colorPrimary: "#0070FF",
            colorPrimaryForeground: "#ffff",
          },
        }}
      >
        <body>
          <ThemeProvider>
            <QueryProviders>
              <TooltipProvider>{children}</TooltipProvider>

              <Toaster position="bottom-center" />
            </QueryProviders>
          </ThemeProvider>
        </body>
      </ClerkProvider>
    </html>
  )
}
