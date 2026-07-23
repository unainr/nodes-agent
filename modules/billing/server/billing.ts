// modules/workspaces/api/route.ts
import { db } from "@/drizzle/db"
import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import { z } from "zod"
import { clerkMiddleware, getAuth } from "@clerk/hono"
import { createMiddleware } from "hono/factory"
import { eq, and, desc, sql } from "drizzle-orm"
import { workspaces } from "@/drizzle/schema"
import { liveblocks } from "@/lib/liveblocks"
import { FEATURE_KEYS, FREE_LIMITS } from "@/lib/billing/plans"
import { workspacesSchema } from "@/modules/workspaces/server/schema"

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
    }),
  )
  .post("/", requireAuth, zValidator("json", workspacesSchema), async (c) => {
    const orgId = c.get("orgId")
    const userId = c.get("userId")
    const { name } = c.req.valid("json")

    const { has } = getAuth(c) // ← same object, no separate import needed
    const hasUnlimited = has({ feature: FEATURE_KEYS.unlimitedWorkspaces })

    if (!hasUnlimited) {
      const [{ count }] = await db
        .select({ count: sql<number>`count(*)` })
        .from(workspaces)
        .where(eq(workspaces.orgId, orgId))

      if (count >= FREE_LIMITS.maxWorkspaces) {
        return c.json({ message: "Workspace limit reached", code: "UPGRADE_REQUIRED" }, 403)
      }
    }

    const [data] = await db.insert(workspaces).values({ name, orgId, createdByUserId: userId }).returning()
    return c.json(data, 201)
  })

export default app