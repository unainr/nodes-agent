import { db } from "@/drizzle/db";


import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { clerkMiddleware, getAuth } from "@clerk/hono";
import { createMiddleware } from "hono/factory";
import { eq, and, desc } from "drizzle-orm";
import { workspaces } from "@/drizzle/schema";
import { workflowGraphSchema } from "./schema";



// schame

// ─── auth middleware ──────────────────────────────────────────────────────────

const requireAuth = createMiddleware<{
    Variables: { userId: string; orgId: string };
}>(async (c, next) => {
    const auth = getAuth(c);
    if (!auth?.userId) return c.json({ message: "Unauthorized" }, 401);
    if (!auth.orgId) return c.json({ message: "No organization selected" }, 401);
    c.set("userId", auth.userId);
    c.set("orgId", auth.orgId);
    await next();
});

const app = new Hono()
    .use(
        "*",
        clerkMiddleware({
            publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
            secretKey: process.env.CLERK_SECRET_KEY,
        }),
    )
    // Get api
   // modules/workspaces/api/route.ts (add alongside GET "/", GET "/:id", POST "/")
.patch(
  "/:id",
  requireAuth,
  zValidator("param", z.object({ id: z.string().uuid() })),
  zValidator("json", workflowGraphSchema),
  async (c) => {
    const orgId = c.get("orgId")
    const { id } = c.req.valid("param")
    const graph = c.req.valid("json")

    const [updated] = await db
      .update(workspaces)
      .set({ graph, updatedAt: new Date() })
      .where(and(eq(workspaces.id, id), eq(workspaces.orgId, orgId)))
      .returning()

    if (!updated) return c.json({ message: "Workspace not found" }, 404)
    return c.json(updated)
  },
)

export default app;