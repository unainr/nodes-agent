import { client } from "@/lib/hono";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { InferRequestType, InferResponseType } from 'hono/client';

type ResponseType = InferResponseType<typeof client.api.workspaces.$post,201>;
type RequestType = InferRequestType<typeof client.api.workspaces.$post>["json"]

export const useCreateWorkspace = () => {
    const queryClient = useQueryClient();

    return useMutation<ResponseType,Error,RequestType>({

        mutationFn: async (json) => {
            const response = await client.api.workspaces.$post({ json });
    
            if (!response.ok) {
               throw new Error("Failed to create workspace");
            }
    
            return await response.json();
        },
    
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["workspaces"] });
        },
    })
}