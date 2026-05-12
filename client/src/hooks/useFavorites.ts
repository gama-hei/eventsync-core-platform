"use client";

import { useState, useCallback, useEffect } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");

    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const toggleFavorite = useCallback((sessionId: string) => {
    setFavorites((prev) => {
      const newFavorites = prev.includes(sessionId)
        ? prev.filter((id) => id !== sessionId)
        : [...prev, sessionId];

      localStorage.setItem(
        "favorites",
        JSON.stringify(newFavorites)
      );

      return newFavorites;
    });
  }, []);

  return {
    favorites,
    toggleFavorite,
  };
}
