// modules/workspaces/api/schema.ts (or wherever your workspacesSchema already lives)
import { z } from "zod"

const startDataSchema = z.object({
  kind: z.literal("start"),
})

const agentDataSchema = z.object({
  kind: z.literal("agent"),
  model: z.string().min(1),
  prompt: z.string(),
})

const conditionDataSchema = z.object({
  kind: z.literal("condition"),
  instruction: z.string(),
})
const httpRequestDataSchema = z.object({
  kind: z.literal("http_request"),
  method: z.enum(["GET", "POST", "PUT", "DELETE"]),
  url: z.string().url(),
  body: z.string().optional(),
})

const endDataSchema = z.object({
  kind: z.literal("end"),
  outputVariable: z.string(),
})

const noteDataSchema = z.object({
  kind: z.literal("note"),
  text: z.string(),
})

const nodeDataSchema = z.discriminatedUnion("kind", [
  startDataSchema,
  agentDataSchema,
  conditionDataSchema,
  httpRequestDataSchema,
  endDataSchema,
  noteDataSchema,
])

const positionSchema = z.object({
  x: z.number(),
  y: z.number(),
})

const nodeSchema = z.object({
  id: z.string(),
  type: z.enum(["start", "agent", "condition", "http_request", "end", "note"]),
  position: positionSchema,
  data: nodeDataSchema,
})

const edgeSchema = z.object({
  id: z.string(),
  source: z.string(),
  target: z.string(),
})

export const workflowGraphSchema = z.object({
  nodes: z.array(nodeSchema),
  edges: z.array(edgeSchema),
})

export type WorkflowGraphInput = z.infer<typeof workflowGraphSchema>