"use client";

import { getEvents } from "@/lib/api";
import { Event } from "@/types";
import { useCache } from "./useCache";

export function useEvents() {
  return useCache<Event[]>({
    key: "events",
    duration: 60000,
    fetcher: getEvents,
  });
}
