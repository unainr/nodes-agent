import { StepNodeType } from "@/modules/workflows/nodes/node-types";
import type { Edge } from "@xyflow/react"
import { jsonb, pgTable, text, timestamp, uuid, pgEnum } from "drizzle-orm/pg-core"

export type WorkflowGraph = { nodes: StepNodeType[]; edges: Edge[] }

export const memberRoleEnum = pgEnum("member_role", ["owner", "editor", "viewer"])

// one row per Clerk Organization
export const workspaces = pgTable("workspaces", {
  id: uuid("id").primaryKey().defaultRandom(),
  orgId: text("org_id").notNull(), // Clerk org id — 1:1 with a workspace
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const workflows = pgTable("workflows", {
  id: uuid("id").primaryKey().defaultRandom(),
  workspaceId: uuid("workspace_id").references(() => workspaces.id, { onDelete: "cascade" }).notNull(),
  createdByUserId: text("created_by_user_id").notNull(), // clerk userId, who authored it
  name: text("name").notNull(),
  graph: jsonb("graph").$type<WorkflowGraph>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export type Workflow = typeof workflows.$inferSelect
export type Workspace = typeof workspaces.$inferSelect