// modules/workspaces/hooks/use-workspace-id.ts
import { client } from "@/lib/hono"
import { useOrganization } from "@clerk/nextjs"
import { useQuery } from "@tanstack/react-query"

export const useWorkspacesId = (id: string) => {
  const { organization } = useOrganization()

  return useQuery({
    queryKey: ["workspace", organization?.id, id],
    queryFn: async () => {
      const res = await client.api.workspaces[":id"].$get({ param: { id } })
      if (!res.ok) {
        if (res.status === 404) throw new Error("NOT_FOUND")
        throw new Error("Failed to fetch workspace")
      }
      const [data] = await res.json()
      return data
    },
    enabled: !!id && !!organization?.id,
    retry: false,
  })
}