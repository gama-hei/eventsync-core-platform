"use client";

import { CacheData, CacheOptions } from "@/types";

import { useEffect, useState } from "react";

export function useCache<T>({
  key,
  duration = 60000,
  fetcher,
}: CacheOptions) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadData = async (force = false) => {
    if (!force) {
      const cached = sessionStorage.getItem(key);
      if (cached) {
        try {
          const parsed: CacheData<T> = JSON.parse(cached);
          if (Date.now() - parsed.timestamp < duration) {
            setData(parsed.data);
            setLoading(false);
            return;
          }
        } catch (e) {
          console.error("Error parsing cache:", e);
        }
      }
    }

    setLoading(true);
    setError(null);
    try {
      const result = await fetcher();
      setData(result);
      sessionStorage.setItem(
        key,
        JSON.stringify({
          data: result,
          timestamp: Date.now(),
        }),
      );
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return { data, loading, error, refetch: () => loadData(true) };
}
