import { useState, useEffect, useCallback } from "react";
import { Session } from "@/types";

const STORAGE_KEY = "event_favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse favorites:", e);
        setFavorites([]);
      }
    }
  }, []);

  const isFavorite = useCallback(
    (sessionId: string) => favorites.includes(sessionId),
    [favorites]
  );

  const toggleFavorite = useCallback(
    (session: Session | string) => {
      const sessionId = typeof session === "string" ? session : session.id;

      setFavorites((prev) => {
        const newFavorites = prev.includes(sessionId)
          ? prev.filter((id) => id !== sessionId)
          : [...prev, sessionId];

        localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
        return newFavorites;
      });
    },
    []
  );

  const addFavorite = useCallback((sessionId: string) => {
    setFavorites((prev) => {
      if (prev.includes(sessionId)) return prev;
      const newFavorites = [...prev, sessionId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
      return newFavorites;
    });
  }, []);

  const removeFavorite = useCallback((sessionId: string) => {
    setFavorites((prev) => {
      const newFavorites = prev.filter((id) => id !== sessionId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
      return newFavorites;
    });
  }, []);

  const getFavoriteSessions = useCallback(
    (sessions: Session[]) => {
      return sessions.filter((session) => favorites.includes(session.id));
    },
    [favorites]
  );

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    addFavorite,
    removeFavorite,
    getFavoriteSessions,
  };
}
