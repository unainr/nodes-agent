import { client } from "@/lib/hono"
import { useOrganization } from "@clerk/nextjs"
import { useQuery } from "@tanstack/react-query"
import { toast } from "sonner"

export const useWorkspaces = () => {
     const { organization } = useOrganization()
    return useQuery({
       queryKey: ["workspaces", organization?.id],
        queryFn: async () => {
            const res = await client.api.workspaces.$get()
            if (!res.ok) {
               throw new Error("Failed to fetch workspaces")
            }
           const data = await res.json();
            return data;
        },
            enabled: !!organization?.id, // don't fetch until an org is actually active

    })
}