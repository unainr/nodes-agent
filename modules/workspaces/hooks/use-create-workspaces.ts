import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { InferRequestType, InferResponseType } from "hono/client";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.workspaces.$post, 201>;
type ErrorResponseType = InferResponseType<typeof client.api.workspaces.$post, 403>;
type RequestType = InferRequestType<typeof client.api.workspaces.$post>["json"];

class ApiError extends Error {
  code?: string;
  constructor(message: string, code?: string) {
    super(message);
    this.code = code;
  }
}

export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseType, ApiError, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.workspaces.$post({ json });

      if (response.status === 403) {
        const data: ErrorResponseType = await response.json();
        throw new ApiError(data.message, data.code);
      }

      if (!response.ok) {
        throw new ApiError("Failed to create workspace");
      }

      return await response.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
    },

    onError: (error) => {
      if (error.code === "UPGRADE_REQUIRED") {
        toast.error(
          "You've reached the free workspace limit. Upgrade to Pro to create more workspaces."
        );
        return;
      }
      toast.error(error.message);
    },
  });
};