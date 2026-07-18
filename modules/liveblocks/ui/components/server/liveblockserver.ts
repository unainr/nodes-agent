import { db } from "@/drizzle/db"

import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import { z } from "zod"
import { clerkMiddleware, getAuth } from "@clerk/hono"
import { createMiddleware } from "hono/factory"
import { eq, and, desc } from "drizzle-orm"
import { workspaces } from "@/drizzle/schema"
import { liveblocks } from "@/lib/liveblocks"

// schame

// ─── auth middleware ──────────────────────────────────────────────────────────

const requireAuth = createMiddleware<{
  Variables: { userId: string; orgId: string }
}>(async (c, next) => {
  const auth = getAuth(c)
  if (!auth?.userId) return c.json({ message: "Unauthorized" }, 401)
  if (!auth.orgId) return c.json({ message: "No organization selected" }, 401)
  c.set("userId", auth.userId)
  c.set("orgId", auth.orgId)
  await next()
})

const app = new Hono()
  .use(
    "*",
    clerkMiddleware({
      publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
      secretKey: process.env.CLERK_SECRET_KEY,
    })
  )

  // post api
  .post("/auth", requireAuth, async (c) => {
    const orgId = c.get("orgId")
    const userId = c.get("userId")
    // pull the Clerk backend client straight off the context — no separate import needed
    const clerkClient = c.get("clerk")
    const user = await clerkClient.users.getUser(userId)
    const { status, body } = await liveblocks.identifyUser(
      {
        userId,
        groupIds: [orgId],
        organizationId:orgId,
      },
      {
        userInfo: {
          name:
            user.fullName ??
            user.username ??
            user.primaryEmailAddress?.emailAddress ??
            "Anonymous",
          avatar: user.imageUrl,
        },
      }
    )
    return new Response(body, { status })
  })
  

export default app
