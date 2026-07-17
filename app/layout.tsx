import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import QueryProviders from "@/providers/query-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ClerkProvider } from "@clerk/nextjs"
import { Toaster } from "@/components/pebble-toast"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

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
      <ClerkProvider>
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
