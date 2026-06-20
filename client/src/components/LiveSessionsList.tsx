"use client";

import Link from "next/link";
import {
  BookmarkCheck,
  BookmarkPlus,
  SearchX,
} from "lucide-react";

import { Session } from "@/types";
import { formatTime } from "@/lib/utils";
import { useFavorites } from "@/hooks/useFavorites";

interface LiveSessionsListProps {
  sessions: Session[];
}

export function LiveSessionsList({
  sessions,
}: LiveSessionsListProps) {
  const { favorites, toggleFavorite } = useFavorites();

  if (sessions.length === 0) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-center">
        <SearchX className="h-10 w-10 text-gray-400 mb-4" />

        <h4 className="text-lg font-bold text-gray-900 mb-1">
          Quiet for now
        </h4>

        <p className="text-gray-900 text-m max-w-xs mx-auto font-serif italic">
          Check the full schedule to see what's coming up next.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {sessions.map((session) => (
        <Link
          key={session.id}
          href={`/sessions/${session.id}`}
          className="group grid grid-cols-1 md:grid-cols-4 gap-6 items-start"
        >
          <div className="md:col-span-3">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
                {session.roomName}
              </span>

              <span className="text-gray-300">•</span>

              <span className="text-xs font-medium text-gray-500">
                {formatTime(session.startTime)} —{" "}
                {formatTime(session.endTime)}
              </span>
            </div>

            <h4 className="text-2xl font-bold mb-3 group-hover:underline decoration-1 underline-offset-4 tracking-tight">
              {session.title}
            </h4>

            <p className="text-gray-500 line-clamp-2 text-sm leading-relaxed mb-6">
              {session.description ||
                "Join this session to interact with speakers in real-time..."}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {session.speakers?.map((s) => (
                    <div
                      key={s.id}
                      className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[10px] font-bold"
                    >
                      {s.fullName.charAt(0)}
                    </div>
                  ))}
                </div>

                <span className="text-xs font-semibold text-black italic">
                  {session.speakers
                    ?.map((s) => s.fullName)
                    .join(", ")}
                </span>
              </div>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavorite(session.id);
                }}
                className="text-gray-400 hover:text-black transition-colors"
              >
                {favorites.includes(session.id) ? (
                  <BookmarkCheck className="h-5 w-5 text-indigo-600" />
                ) : (
                  <BookmarkPlus className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
