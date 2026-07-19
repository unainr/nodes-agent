"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { Spinner } from "@/components/ui/spinner";
import { resolveUsers } from "@/lib/utils";

export function Room({ children,roomId }: { children: ReactNode,roomId:string }) {
  return (
    <LiveblocksProvider badgeLocation="bottom-left" throttle={16} 
     resolveUsers={resolveUsers}
    authEndpoint="/api/liveblocks/auth">
      <RoomProvider id={roomId}>
        <ClientSideSuspense fallback={<div className="flex min-h-svh items-center justify-center">
          <Spinner className="size-6 text-muted-foreground"/>
        </div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}