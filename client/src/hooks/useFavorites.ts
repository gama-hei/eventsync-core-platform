import { useState, useEffect, useCallback } from "react";
import { Session } from "@/types/types";

const STORAGE_KEY = "favorite_sessions";

export function useFavorites() {
  const [favorites, setFavorites] = useState<Session[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setFavorites(JSON.parse(stored));
    } catch {
      setFavorites([]);
    }
  }, []);

  const isFavorite = useCallback(
    (sessionId: string) => favorites.some((s) => s.id === sessionId),
    [favorites]
  );

  const toggleFavorite = useCallback((session: Session) => {
    setFavorites((prev) => {
      const exists = prev.some((s) => s.id === session.id);
      const updated = exists
        ? prev.filter((s) => s.id !== session.id)
        : [...prev, session];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return { favorites, isFavorite, toggleFavorite };
}