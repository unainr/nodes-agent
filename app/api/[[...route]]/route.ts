
import liveblockserver from "@/modules/liveblocks/ui/components/server/liveblockserver";
import workflow from "@/modules/workflows/server/workflow";
import workspaces from "@/modules/workspaces/server/workspaces";
import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api");

const routes = app
	.route("/workspaces", workspaces)
	.route("/liveblocks",liveblockserver)
	.route("/workflow",workflow)
	

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
