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
    <div className="max-w-4xl mx-auto max-w-[80vw] px-6 py-12">
  <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-black-500 hover:text-black-900 transition-colors"
        >
          <Home className="h-7 w-7" />
         <span className="text-2xl"> Back to Home</span> 
        </Link>
      </div>      <div className="mb-10">
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="w-20 h-3 bg-indigo-600" />
          <span className="text-2xl font-bold uppercase tracking-[0.2em] text-indigo-600">
            My Favorities
          </span>
        </div>
        
        <h1 className="text-4xl font-serif font-medium text-black mb-2">
          Sessions saved
        </h1>
        <p className="text-black-500">
          {favorites.length === 0
            ? "No session yet."
            : `${favorites.length} session${favorites.length > 1 ? "s" : ""} in your Favorite`}
        </p>
      </div>

      
      {favorites.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-black-400">
          <Heart className="h-12 w-12" />
          <p className="text-lg">Add Sessions in Your Favorite</p>
          <Link
            href="/events/"
            className="mt-2 inline-flex items-center gap-2 bg-black text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-zinc-800 transition-all"
          >
            View Events
          </Link>
        </div>
      )}

    
      <div className=" gap-6 flex flex-wrap  ">
        {favorites.map((session: Session) => (
          <div
            key={session.id}
            className="relative rounded-2xl bg-[#FBFBFB] border border-indigo-400 p-6 hover:border-gray-200 transition-all lg:max-w-[20vw] transition-all duration-300 hover:-translate-y-3 hover:scale-105  hover:shadow-2xl"
          >
            <button
              onClick={() => toggleFavorite(session)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-red-50 transition-colors group"
              aria-label="Retirer des favoris"
            >
              <Trash2 className="h-4 w-4 text-red-600 group-hover:text-red-400 transition-colors" />
            </button>

            <Link href={`/sessions/${session.id}`} className="block">
              <h2 className="text-lg font-serif font-medium text-black mb-2 pr-10 hover:text-indigo-700 transition-colors">
                {session.title}
              </h2>
              <p className="text-sm text-black-500 italic mb-4 line-clamp-2 text-pretty">
                {session.description}
              </p>

              <div className="grid grid-col-2 gap-4 text-sm text-black-400">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDate(session.startTime)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  <span className="font-mono">
                    {formatTime(session.startTime)}
                  </span>
                  <span className="text-black-200">—</span>
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