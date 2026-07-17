import { db } from "@/drizzle/db";


import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { clerkMiddleware, getAuth } from "@clerk/hono";
import { createMiddleware } from "hono/factory";
import { eq, and, desc } from "drizzle-orm";
import { workspaces } from "@/drizzle/schema";
import { workspacesSchema } from "./schema";



// schame

// ─── auth middleware ──────────────────────────────────────────────────────────

const requireAuth = createMiddleware<{
	Variables: { userId: string; orgId: string };
}>(async (c, next) => {
	const auth = getAuth(c);
	if (!auth?.userId) return c.json({ message: "Unauthorized" }, 401);
	if (!auth.orgId) return c.json({ message: "No organization selected" }, 401);
	c.set("userId", auth.userId);
	c.set("orgId", auth.orgId);
	await next();
});

const app = new Hono()
	.use(
		"*",
		clerkMiddleware({
			publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
			secretKey: process.env.CLERK_SECRET_KEY,
		}),
	)
	// Get api
	.get("/", requireAuth, async (c) => {
		const orgId = c.get("orgId"); // always the current org

		const result = await db
			.select()
			.from(workspaces)
			.where(eq(workspaces.orgId, orgId)).orderBy(desc(workspaces.createdAt)) // only this org's workspaces

		return c.json( result );
	})
	.get("/:id",zValidator("param", z.object({ id: z.string() })),requireAuth, async (c) => {

		const orgId = c.get("orgId"); // always the current org
		const {id} = c.req.valid("param")
		const result = await db.select().from(workspaces).where(and(eq(workspaces.orgId, orgId),eq(workspaces.id,id))).limit(1)
		if(result.length === 0){
			return c.json({message:"workspace not found"},404)
		}
		return c.json(result)
	})
    // post api
    .post("/",requireAuth, zValidator("json",workspacesSchema),async (c)=>{
        const orgId = c.get("orgId")
        const { name } = await c.req.valid("json")

       
        const [data] = await db.insert(workspaces).values({
            name,
            orgId,
        }).returning()
        return c.json(data,201)
    })

export default app;