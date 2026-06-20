"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function Sidebar() {
  const [favoritesCount, setFavoritesCount] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      const favorites = JSON.parse(stored);
      setFavoritesCount(favorites.length);
    }

    const handleStorageChange = () => {
      const updated = localStorage.getItem("favorites");
      if (updated) {
        setFavoritesCount(JSON.parse(updated).length);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <aside className="lg:col-span-4">
      <div className="sticky top-32 space-y-12">
        <div className="pb-8 border-b border-gray-100">
          <h3 className="font-bold text-sm uppercase tracking-widest mb-6">
            Your Personal Itinerary
          </h3>
          {favoritesCount > 0 ? (
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              You've saved <strong>{favoritesCount} sessions</strong>.
            </p>
          ) : (
            <p className="text-sm text-gray-900 italic mb-6 leading-relaxed">
              Start bookmarking sessions to build your personal event journey.
            </p>
          )}
          <Link
            href="/favorites"
            className="text-sm font-bold text-indigo-600 hover:text-indigo-700 underline underline-offset-4 transition-all"
          >
            View my itinerary →
          </Link>
        </div>
        <div>
          <h3 className="font-bold text-sm uppercase tracking-widest mb-6">
            Need Assistance?
          </h3>
          <div className="space-y-4">
            <div className="group">
              <p className="text-[20px] font-bold text-indigo-600 uppercase mb-1">
                Guest WiFi
              </p>
              <p className="text-sm font-medium group-hover:text-indigo-600 transition-colors">
                Event2026_Guest
              </p>
            </div>
            <div className="group">
              <p className="text-[20px] font-bold text-indigo-600 uppercase mb-1">
                Help Desk
              </p>
              <p className="text-sm font-medium group-hover:text-indigo-600 transition-colors">
                Located in Hall A Main Lobby
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
