// lib/billing/plans.ts
export const PLAN_KEYS = {
  pro: "pro",
} as const

export const FEATURE_KEYS = {
  unlimitedWorkspaces: "unlimited_workspaces",
  unlimitedCollaborators: "workflow_collaborators",
  unlimitedAiRuns: "ai_test_runs",
} as const

export const FREE_LIMITS = {
  maxWorkspaces: 1,
  maxAiRunsPerMonth: 10,
} as const

export function currentBillingMonth() {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`
}