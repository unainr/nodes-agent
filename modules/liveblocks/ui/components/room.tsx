"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";

export function Room({ children,roomId }: { children: ReactNode,roomId:string }) {
  return (
    <LiveblocksProvider throttle={16} publicApiKey={"pk_dev_U_pM6ORRbf8Bg2zjDufrTImGgP2eY1dxXfCh_xUPtosmDCTNeENsGVE2p4iW4IKF"}>
      <RoomProvider id={roomId}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}