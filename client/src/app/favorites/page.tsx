"use client";
import { useFavorites } from "@/hooks/useFavorites";
import { Session } from "@/types/types";
import Link from "next/link";
import { Heart, Calendar, Clock, Mic2, Trash2, Home } from "lucide-react";
import { formatTime } from "@/app/events/[id]/page";

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
  <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          <Home className="h-4 w-4" />
          Back to Home
        </Link>
      </div>      <div className="mb-10">
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="w-8 h-px bg-indigo-600" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
           Saved Sessions
          </span>
        </div>

        <h1 className="text-4xl font-serif font-medium text-black mb-2">
          Saved Sessions
        </h1>
        <p className="text-gray-500">
          {favorites.length === 0
            ? "No sessions saved yet."
            : `${favorites.length} session${favorites.length > 1 ? "s" : ""} in your favorites.`}
        </p>
      </div>


      {favorites.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-400">
          <Heart className="h-12 w-12" />
          <p className="text-lg">Browse sessions and add your favorites</p>
          <Link
            href="/events/"
            className="mt-2 inline-flex items-center gap-2 bg-black text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-zinc-800 transition-all"
          >
            View events
          </Link>
        </div>
      )}


      <div className="grid gap-6">
        {favorites.map((session: Session) => (
          <div
            key={session.id}
            className="relative rounded-2xl bg-[#FBFBFB] border border-gray-100 p-6 hover:border-gray-200 transition-all"
          >
            {/* Bouton retirer */}
            <button
              onClick={() => toggleFavorite(session)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-red-50 transition-colors group"
              aria-label="Retirer des favoris"
            >
              <Trash2 className="h-4 w-4 text-gray-300 group-hover:text-red-400 transition-colors" />
            </button>

            <Link href={`/sessions/${session.id}`} className="block">
              <h2 className="text-lg font-serif font-medium text-black mb-2 pr-10 hover:text-indigo-700 transition-colors">
                {session.title}
              </h2>
              <p className="text-sm text-gray-500 italic mb-4 line-clamp-2">
                {session.description}
              </p>

              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDate(session.startTime)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  <span className="font-mono">
                    {formatTime(session.startTime)}
                  </span>
                  <span className="text-gray-200">—</span>
                  <span className="font-mono">
                    {formatTime(session.endTime)}
                  </span>
                </span>
                {session.speakers?.[0] && (
                  <span className="flex items-center gap-1.5">
                    <Mic2 className="h-3.5 w-3.5" />
                    {session.speakers[0].fullName}
                  </span>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
