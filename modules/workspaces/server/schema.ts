import {z} from "zod"

export const workspacesSchema = z.object({
    name: z.string().min(3).max(50),
})