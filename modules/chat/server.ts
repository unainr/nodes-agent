import { getModelDefinition } from "@/lib/model-registry"
import { openrouter } from "@/lib/open-router"

import { clerkMiddleware, getAuth } from "@clerk/hono"
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  stepCountIs,
  streamText,
  toUIMessageStream,
} from "ai"
import { Hono } from "hono"
import { createMiddleware } from "hono/factory"
import type { UIMessage } from "ai"
import { groq } from "@ai-sdk/groq"
import { StepNodeType } from "../workflows/nodes/node-types"
import type { Edge } from "@xyflow/react"
import { buildWorkflowSystemPrompt } from "@/lib/utils"
import { buildWorkflowTools } from "../workflows/execution/build-workflow-tools"
import { currentBillingMonth, FEATURE_KEYS, FREE_LIMITS } from "@/lib/billing/plans"
import { aiUsage } from "@/drizzle/schema"
import { db } from "@/drizzle/db"
import { sql } from "drizzle-orm"

// schame

// ─── auth middleware ──────────────────────────────────────────────────────────

const requireAuth = createMiddleware<{
  Variables: { userId: string; orgId: string; has: ReturnType<typeof getAuth>["has"]  }
}>(async (c, next) => {
  const auth = getAuth(c)
  if (!auth?.userId) return c.json({ message: "Unauthorized" }, 401)
  if (!auth.orgId) return c.json({ message: "No organization selected" }, 401)
  c.set("userId", auth.userId)
  c.set("orgId", auth.orgId)
  c.set("has", auth.has)
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
  // Get api
  // modules/workspaces/api/route.ts (add alongside GET "/", GET "/:id", POST "/")
  .post("/", requireAuth, async (c) => {
    const orgId = c.get("orgId")
      const { messages, nodes, edges }: { messages: UIMessage[]; nodes: StepNodeType[]; edges: Edge[] } =
    await c.req.json()
    // const modelDef = getModelDefinition(model)
    const has = c.get("has")
const hasUnlimited = has({ feature: FEATURE_KEYS.unlimitedAiRuns })
if (!hasUnlimited) {
    const month = currentBillingMonth()

    const [usage] = await db
      .insert(aiUsage)
      .values({ orgId, month, count: 1 })
      .onConflictDoUpdate({
        target: [aiUsage.orgId, aiUsage.month],
        set: { count: sql`${aiUsage.count} + 1` },
      })
      .returning()

    if (usage.count > FREE_LIMITS.maxAiRunsPerMonth) {
      return c.json({ message: "AI test run limit reached", code: "UPGRADE_REQUIRED" }, 403)
    }
  }
const modelMessages = await convertToModelMessages(messages);
  const tools = buildWorkflowTools(nodes)

    const result = streamText({
      model: groq("openai/gpt-oss-120b"),
      system: buildWorkflowSystemPrompt(nodes, edges),
  messages: modelMessages,
  tools,
    stopWhen: stepCountIs(5), 
    })

   return result.toUIMessageStreamResponse();
  })

export default app
