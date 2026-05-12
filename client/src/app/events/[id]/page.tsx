import { Calendar, Clock, MapPin, User, MessageCircle, ArrowLeft, DoorOpen } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { API_BASE_URL } from "@/lib/constants";
import { Event, Session } from "@/types";

export const revalidate = 60;

async function getEvent(id: string): Promise<Event | null> {
  const url = `${API_BASE_URL}/events/${id}`;
  console.log("Fetching event from:", url);

  try {
    const res = await fetch(url, {
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(dateString: string): string {
  return new Date(dateString).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function isLive(startTime: string, endTime: string): boolean {
  const now = new Date();
  const start = new Date(startTime);
  const end = new Date(endTime);
  return now >= start && now <= end;
}

interface EventPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EventPage({ params }: EventPageProps) {
  const { id } = await params;

  console.log("EventPage rendering for ID:", id);

  const event = await getEvent(id);

  if (!event) {
    notFound();
  }

  const sessions = event.sessions || [];

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-6 h-16 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-gray-900">
            EventSync
          </Link>
          <Link
            href="/events"
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            All Events
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-10">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(event.startDate)}</span>
            <span>—</span>
            <span>{formatDate(event.endDate)}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4 tracking-tight">
            {event.title}
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            {event.description}
          </p>
          <div className="flex items-center gap-4 text-gray-500">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MessageCircle className="h-4 w-4" />
              <span>{sessions.length} sessions</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-10">
          <div className="flex items-center gap-3 mb-8">
            <DoorOpen className="h-6 w-6 text-indigo-600" />
            <h2 className="text-2xl font-serif font-semibold text-gray-900">
              Sessions
            </h2>
          </div>

          {sessions.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-2xl">
              <p className="text-gray-400">No sessions scheduled yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {sessions.map((session) => {
                const live = isLive(session.startTime, session.endTime);
                return (
                  <Link key={session.id} href={`/sessions/${session.id}`}>
                    <div className={`group p-5 rounded-xl border transition-all hover:shadow-md ${
                      live ? "border-red-200 bg-red-50/30" : "border-gray-100 hover:border-gray-200"
                    }`}>
                      <div className="flex flex-col md:flex-row md:items-start gap-4">
                        <div className="md:w-1/5">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Clock className="h-4 w-4" />
                            <span className="font-mono">
                              {formatTime(session.startTime)} — {formatTime(session.endTime)}
                            </span>
                          </div>
                          {live && (
                            <span className="inline-block mt-2 text-xs font-semibold text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
                              LIVE NOW
                            </span>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors mb-2">
                            {session.title}
                          </h3>
                          <p className="text-gray-500 line-clamp-2 text-sm leading-relaxed">
                            {session.description || "No description available"}
                          </p>
                          <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-gray-400">
                            <div className="flex items-center gap-1.5">
                              <DoorOpen className="h-3.5 w-3.5" />
                              <span>{session.roomName}</span>
                            </div>
                            {session.speakers && session.speakers.length > 0 && (
                              <div className="flex items-center gap-1.5">
                                <User className="h-3.5 w-3.5" />
                                <span>{session.speakers.map(s => s.fullName).join(", ")}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="md:w-auto flex items-center">
                          <ArrowLeft className="h-5 w-5 text-gray-300 rotate-180 group-hover:text-indigo-500 transition-colors" />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
