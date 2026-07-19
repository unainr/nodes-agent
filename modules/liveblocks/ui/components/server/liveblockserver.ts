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
type UserInfo = Liveblocks["UserMeta"]["info"]

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
        organizationId: orgId,
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
  .post("/users", requireAuth, async (c) => {
    const orgId = c.get("orgId")
    const userId = c.get("userId")
    const clerkClient = c.get("clerk")

    let body: unknown
    try {
      body = await c.req.json()
    } catch {
      return c.json({ error: "Invalid JSON body" }, 400)
    }

    const { userIds } = body as { userIds?: unknown }

    if (
      !Array.isArray(userIds) ||
      userIds.some((id) => typeof id !== "string")
    ) {
      return c.json({ error: "Expected { userIds: string[] }" }, 400)
    }

    const ids = userIds as string[]

    if (ids.length === 0) {
      return c.json([])
    }

    // Scope lookups to the caller's org so display info can't be
    // harvested for users outside the caller's tenant.
    const { data: users } = await clerkClient.users.getUserList({
      userId: ids,
      organizationId: [orgId],
      limit: ids.length,
    })

    const usersById = new Map(users.map((user) => [user.id, user]))

    // Must return one entry per requested ID, in the same order —
    // Liveblocks' resolveUsers depends on positional alignment with
    // the userIds it sent, not just a set of resolved users.
    const resolved: (UserInfo | null)[] = ids.map((id) => {
      const user = usersById.get(id)
      if (!user) return null

      return {
        name:
          user.fullName ??
          user.username ??
          user.primaryEmailAddress?.emailAddress ??
          "Anonymous",
        avatar: user.imageUrl,
      }
    })

    return c.json(resolved)
  })

export default app
