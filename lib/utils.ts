import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// lib/liveblocks/resolveUsers.ts
type UserInfo = Liveblocks["UserMeta"]["info"]

export async function resolveUsers({
  userIds,
}: {
  userIds: string[]
}): Promise<(UserInfo | undefined)[] | undefined> {
  try {
    const response = await fetch("/api/liveblocks/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userIds }),
    })

    if (!response.ok) {
      console.error("Failed to resolve users, status:", response.status)
      return undefined
    }

    const data: (UserInfo | null)[] = await response.json()

    // Liveblocks' resolveUsers type expects `undefined` for unresolved
    // users, not `null` — convert here since our API returns null.
    return data.map((user) => user ?? undefined)
  } catch (error) {
    return undefined
  }
}
