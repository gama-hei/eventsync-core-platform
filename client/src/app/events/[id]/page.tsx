import { API_BASE_URL } from "@/lib/constants";
import { Event } from "@/types";
import { Room } from "@/types";
import { log } from "console";

import {
  ArrowLeft,
  Calendar,
  Clock,
  DoorOpen,
  MapPin,
  Mic2,
  Users,
  Home,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 60;

async function getEvent(id: string): Promise<Event | null> {
  const url = `${API_BASE_URL}/events/${id}`;

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

export async function getRoom(): Promise<Room[] | null> {
  const urlRoom = `${API_BASE_URL}/rooms`;
  try {
    const res = await fetch(urlRoom, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatTime(dateString: string): string {
  return new Date(dateString).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function isLive(startTime: string, endTime: string): boolean {
  const now = new Date();
  const start = new Date(startTime);
  const end = new Date(endTime);
  return now >= start && now <= end;
}

interface EventPageProps {
  params: Promise<{ id: string }>;
}

export default async function EventPage({ params }: EventPageProps) {
  const { id } = await params;
  const event = await getEvent(id);
  const rooms = await getRoom();

  if (!event) notFound();

  const sessions = event.sessions || [];

  return (
    <main>
      <div className="relative overflow-hidden bg-linear-to-b from-gray-50 to-white border-b border-gray-100">
        <div className="absolute inset-0 bg-grid-gray-100/25 mask-[radial-gradient(ellipse_at_center,white,transparent)] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
      
          <Link
            href="/events"
            className=" inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors mb-8"
          >
            <ArrowLeft className="h-8 w-8" />
<span className="text-2xl text-black">All Event </span>
           
          </Link>
    
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-black/5 rounded-full text-sm">
              <Calendar className="h-4 w-4 text-black-400 " />
              <span className="text-black-400 font-mono text-sm">
                {formatDate(event.startDate)} – {formatDate(event.endDate)}
              </span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-black/5 rounded-full text-sm">
              <MapPin className="h-4 w-4 text-black-400 " />
              <span className="text-black-400 ">{event.location}</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-black tracking-tight leading-[1.1] mb-6">
            {event.title}
          </h1>

          <p className="text-xl text-gray-500 leading-relaxed max-w-2xl">
            {event.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 mt-8 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-xs text-gray-600 font-medium uppercase tracking-wide">
                  Total Sessions
                </div>
                <div className="text-xl font-semibold text-black">
                  {sessions.length}
                </div>
              </div>
            </div>
            {/* <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                <Mic2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                  Speakers
                </div>
                <div className="text-xl font-semibold text-black">
                  {
                    [
                      ...new Set(
                        sessions.flatMap(
                          (s) => s.speakers?.map((sp) => sp.id) || [],
                        ),
                      ),
                    ].length
                  }
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-serif font-semibold text-black tracking-tight">
              Schedule
            </h2>
            <p className="text-xl text-indigo-900  mt-1">
              All sessions for this event
            </p>
          </div>
          <div className="text-sm text-gray-900 bg-gray-300 px-3 py-1 rounded-full">
            {sessions.length} sessions
          </div>
        </div>

        {sessions.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-100">
            <DoorOpen className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">
              No sessions scheduled yet
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Check back later for updates
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 border-t border-gray-400">
            {sessions.map((session, index) => {
              const room = rooms?.find((room) => room.id === session.roomId);
              const live = isLive(session.startTime, session.endTime);
              return (
                <Link key={session.id} href={`/sessions/${session.id}`}>
                  <div
                    className={`group relative py-6 hover:bg-gray-50/50 transition-colors -mx-6 px-6 rounded-2xl ${
                      live ? "bg-red-50/30" : ""
                    }`}
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/4">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-black-400  group-hover:text-gray-600 transition-colors" />
                          <span className="font-mono text-sm text-black-400 ">
                            {formatTime(session.startTime)}
                          </span>
                          <span className="text-gray-300">—</span>
                          <span className="font-mono text-sm text-black-400 ">
                            {formatTime(session.endTime)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-2 text-sm text-indigo-600 ">
                          <DoorOpen className="h-3.5 w-3.5" />

                          <span className="text-sm">
                            {room?.name || "Salle inconnue"}
                          </span>
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            {live && (
                              <div className="flex items-center gap-1.5 mb-2">
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
                                </span>
                                <span className="text-xs font-semibold text-red-600 uppercase tracking-wide">
                                  Live Now
                                </span>
                              </div>
                            )}
                            <h3 className="text-xl font-semibold text-black group-hover:text-indigo-600 transition-colors">
                              {session.title}
                            </h3>
                            <p className="text-gray-700 text-sm leading-relaxed mt-1 line-clamp-2">
                              {session.description ||
                                "No description available"}
                            </p>
                            {session.speakers &&
                              session.speakers.length > 0 && (
                                <div className="flex items-center gap-2 mt-3">
                                  <div className="flex -space-x-2">
                                    {session.speakers
                                      .slice(0, 3)
                                      .map((speaker) => (
                                        <div
                                          key={speaker.id}
                                          className="w-7 h-7 rounded-full bg-indigo-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-indigo-600"
                                        >
                                          {speaker.fullName.charAt(0)}
                                        </div>
                                      ))}
                                  </div>
                                  <span className="text-xs text-gray-400">
                                    {session.speakers
                                      .map((s) => s.fullName)
                                      .join(", ")}
                                  </span>
                                </div>
                              )}
                          </div>
                          <div className="shrink-0">
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                              <ArrowLeft className="h-4 w-4 text-gray-400 group-hover:text-indigo-600 rotate-180 transition-colors" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {index !== sessions.length - 1 && (
                      <div className="absolute bottom-0 left-6 right-6 h-px bg-gray-100" />
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
