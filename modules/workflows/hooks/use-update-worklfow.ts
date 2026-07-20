import { client } from "@/lib/hono";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { InferRequestType, InferResponseType } from 'hono/client';

type ResponseType = InferResponseType<typeof client.api.workflow[":id"]["$patch"]>
type RequestType = InferRequestType<typeof client.api.workflow[":id"]["$patch"]>["json"]

export const useSaveWorkspaceGraph = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation<ResponseType,Error,RequestType>({

        mutationFn: async (json) => {
            const response = await client.api.workflow[":id"]["$patch"]({
                param:{id},
                json
            })
    
            if (!response.ok) {
               throw new Error("Failed to save workflow");
            }
    
            return await response.json();
        },
    
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["workspaces"] });
        },
    })
}