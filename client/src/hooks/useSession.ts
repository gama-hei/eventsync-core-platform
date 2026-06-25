import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/lib/constants";
import { Session } from "@/types";

export function useSession(sessionId: string) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/sessions/${sessionId}`);
        if (!res.ok) throw new Error("Session not found");
        const data = await res.json();
        setSession(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load session");
      } finally {
        setLoading(false);
      }
    };
    fetchSession();
  }, [sessionId]);

  return { session, loading, error };
}
