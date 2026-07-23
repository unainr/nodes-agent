// drizzle/schema.ts
import { StepNodeType } from "@/modules/workflows/nodes/node-types"
import type { Edge } from "@xyflow/react"
import { jsonb, pgTable, text, timestamp, uuid, pgEnum, integer, uniqueIndex } from "drizzle-orm/pg-core"

export type WorkflowGraph = { nodes: StepNodeType[]; edges: Edge[] }

export const memberRoleEnum = pgEnum("member_role", ["owner", "editor", "viewer"])

export const workspaces = pgTable("workspaces", {
  id: uuid("id").primaryKey().defaultRandom(),
  orgId: text("org_id").notNull(), // an org can have many workspaces
  createdByUserId: text("created_by_user_id").notNull(),
  name: text("name").notNull(),
  graph: jsonb("graph").$type<WorkflowGraph>(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})
export const aiUsage = pgTable(
  "ai_usage",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    orgId: text("org_id").notNull(),
    month: text("month").notNull(), // "2026-07" format
    count: integer("count").notNull().default(0),
  },
  (table) => ({
    orgMonthUnique: uniqueIndex("ai_usage_org_month_idx").on(table.orgId, table.month),
  }),
)

export type AiUsage = typeof aiUsage.$inferSelect
export type Workspace = typeof workspaces.$inferSelect