"use client";

import { getLiveSessions } from "@/lib/api";
import { Session } from "@/types";
import { useCache } from "./useCache";

export function useLiveSessions() {
  return useCache<Session[]>({
    key: "live_sessions",
    duration: 10000,
    fetcher: getLiveSessions,
  });
}
