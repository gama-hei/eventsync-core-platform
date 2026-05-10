"use client";

import {
  ArrowRight,
  BookmarkCheck,
  BookmarkPlus,
  Calendar,
  Clock,
  Loader2,
  MapPin,
  SearchX,
  Sparkles,
  Zap
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Speaker {
  id: string;
  fullName: string;
}

interface Session {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  roomName: string;
  capacity: number;
  eventId: string;
  eventTitle: string;
  speakers?: Speaker[];
}

interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
}

export default function HomePage() {
  const [featuredEvent, setFeaturedEvent] = useState<Event | null>(null);
  const [liveSessions, setLiveSessions] = useState<Session[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));

    Promise.all([
      fetch("http://localhost:8080/events").then((res) => res.json()),
      fetch("http://localhost:8080/sessions/live").then((res) => res.json()),
    ])
      .then(([eventsData, liveData]) => {
        if (eventsData?.length > 0) setFeaturedEvent(eventsData[0]);
        setLiveSessions(liveData || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const toggleFavorite = (sessionId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newFavorites = favorites.includes(sessionId)
      ? favorites.filter((id) => id !== sessionId)
      : [...favorites, sessionId];
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });

  const formatTime = (date: string) =>
    new Date(date).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 antialiased">
      <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-20 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-black tracking-tighter text-black">EventSync</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/schedule" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">Schedule</Link>
            <Link href="/rooms" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">Venues</Link>
            <Link href="/events" className="px-6 py-2 text-sm font-medium bg-black text-white rounded-full hover:bg-gray-800 transition-all">
              Explore
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* --- Featured Event (Medium Hero Style) --- */}
        {featuredEvent && (
          <section className="relative overflow-hidden rounded-3xl bg-[#FBFBFB] border border-gray-100 p-8 md:p-20 mb-20">
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 mb-8">
                <span className="w-8 h-px bg-indigo-600"></span>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">Featured Event</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-serif font-medium text-black mb-8 leading-tight tracking-tight">
                {featuredEvent.title}
              </h2>
              <p className="text-xl text-gray-600 font-normal mb-10 leading-relaxed italic">
                {featuredEvent.description}
              </p>
              <div className="flex flex-wrap gap-8 mb-12 text-sm font-medium text-gray-500">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> {formatDate(featuredEvent.startDate)}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> {featuredEvent.location}
                </div>
              </div>
              <Link href={`/events/${featuredEvent.id}`} className="inline-flex items-center gap-3 bg-black text-white px-10 py-4 rounded-full font-bold text-base hover:bg-zinc-800 transition-all">
                Full Program <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-4 mb-10 border-b border-gray-100 pb-4">
              <h3 className="text-xl font-bold tracking-tight">Happening Now</h3>
              <div className="flex items-center gap-2 px-2 py-0.5 bg-red-50 text-red-600 rounded text-[10px] font-black uppercase tracking-wider">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                </span>
                Live
              </div>
            </div>

            {liveSessions.length > 0 ? (
              <div className="space-y-12">
                {liveSessions.map((session) => (
                  <Link key={session.id} href={`/sessions/${session.id}`} className="group grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
                    <div className="md:col-span-3">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">{session.roomName}</span>
                        <span className="text-gray-300">•</span>
                        <span className="text-xs font-medium text-gray-500">{formatTime(session.startTime)} — {formatTime(session.endTime)}</span>
                      </div>
                      <h4 className="text-2xl font-bold mb-3 group-hover:underline decoration-1 underline-offset-4 tracking-tight">
                        {session.title}
                      </h4>
                      <p className="text-gray-500 line-clamp-2 text-sm leading-relaxed mb-6">
                        Join this session to interact with speakers in real-time. Upvote questions and participate in the discussion.
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex -space-x-2">
                            {session.speakers?.map((s) => (
                              <div key={s.id} className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[10px] font-bold">
                                {s.fullName.charAt(0)}
                              </div>
                            ))}
                          </div>
                          <span className="text-xs font-semibold text-black italic">
                            {session.speakers?.map(s => s.fullName).join(", ")}
                          </span>
                        </div>
                        <button onClick={(e) => toggleFavorite(session.id, e)} className="text-gray-400 hover:text-black transition-colors">
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
            ) : (
              <div className="py-20 flex flex-col items-center justify-center text-center">
                <SearchX className="h-10 w-10 text-gray-200 mb-4" />
                <h4 className="text-lg font-bold text-gray-900 mb-1">Quiet for now</h4>
                <p className="text-gray-500 text-sm max-w-xs mx-auto font-serif italic">Check the full schedule to see what's coming up next.</p>
              </div>
            )}
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-32 space-y-12">
              <div className="pb-8 border-b border-gray-100">
                <h3 className="font-bold text-sm uppercase tracking-widest mb-6">Your Personal Itinerary</h3>
                {favorites.length > 0 ? (
                  <p className="text-sm text-gray-600 leading-relaxed mb-6">
                    You've saved <strong>{favorites.length} sessions</strong>. We'll keep them here for quick access during the event.
                  </p>
                ) : (
                  <p className="text-sm text-gray-400 italic mb-6 leading-relaxed">
                    Start bookmarking sessions to build your personal event journey.
                  </p>
                )}
                <Link href="/schedule" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 underline underline-offset-4 transition-all">
                  Go to full schedule
                </Link>
              </div>
              <div>
                <h3 className="font-bold text-sm uppercase tracking-widest mb-6">Need Assistance?</h3>
                <div className="space-y-4">
                  <div className="group">
                    <p className="text-[11px] font-bold text-gray-400 uppercase mb-1">Guest WiFi</p>
                    <p className="text-sm font-medium group-hover:text-indigo-600 transition-colors">Event2026_Guest</p>
                  </div>
                  <div className="group">
                    <p className="text-[11px] font-bold text-gray-400 uppercase mb-1">Help Desk</p>
                    <p className="text-sm font-medium group-hover:text-indigo-600 transition-colors">Located in Hall A Main Lobby</p>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed font-serif italic pt-4">
                    "Live Q&A is only available while a session is active. Questions are non-moderated in this version."
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

    </div>
  );
}
