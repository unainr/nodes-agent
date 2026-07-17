import { client } from "@/lib/hono"
import { useOrganization } from "@clerk/nextjs"
import { useQuery } from "@tanstack/react-query"

export const useWorkspacesId = (id: string) => {
  return useQuery({
    enabled: !!id, // don't fetch until an org is actually active

    queryKey: ["workspaces", id],
    queryFn: async () => {
      const res = await client.api.workspaces[":id"].$get({
        param:{id},
      })
      if (!res.ok) {
        throw new Error("Failed to fetch workspaces")
      }
      const [data] = await res.json()
      return data
    },
  })
}
