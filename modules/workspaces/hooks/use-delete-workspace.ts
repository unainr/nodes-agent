// modules/workspaces/hooks/use-delete-workspace.ts
import { client } from "@/lib/hono"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useOrganization } from "@clerk/nextjs"
import { toast } from "sonner"
import { InferResponseType } from "hono/client"

type ResponseType = InferResponseType<
  (typeof client.api.workspaces)[":id"]["$delete"]
>
export const useDeleteWorkspace = (id: string) => {
  const queryClient = useQueryClient()
  const { organization } = useOrganization()
  return useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const res = await client.api.workspaces[":id"]["$delete"]({
        param: { id },
      })
      if (!res.ok) throw new Error("Failed to delete workspace")
      return await res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workspaces", organization?.id],
      })
    },
    onError: () => toast.error("Failed to delete workspace"),
  })
}
