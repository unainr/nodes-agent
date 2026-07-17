import {
  FolderPlus,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { CreateWorkspaceDialog } from "./create-workspace-dialog";

interface WorkspaceEmptyStateProps {
  onCreate?: () => void;
}

export function WorkspaceEmptyState({
  onCreate,
}: WorkspaceEmptyStateProps) {
  return (
    <div className="flex h-[calc(100vh-9rem)] items-center justify-center px-6">
      <div className="w-full max-w-lg text-center">
        {/* Icon */}
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl border bg-muted">
          <FolderPlus className="h-6 w-6 text-muted-foreground" />
        </div>

        {/* Heading */}
        <h2 className="mt-6 text-2xl font-semibold tracking-tight">
          No workspaces yet
        </h2>

        {/* Description */}
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Create your first workspace to organize projects, documents,
          AI agents, and collaborate with your team.
        </p>

        {/* CTA */}
       <CreateWorkspaceDialog/>

        {/* Bottom Hint */}
        <div className="mt-10 rounded-lg border bg-muted/40 px-4 py-3">
          <p className="text-sm text-muted-foreground">
            Every workspace gets its own projects, members, settings,
            and AI resources.
          </p>
        </div>
      </div>
    </div>
  );
}