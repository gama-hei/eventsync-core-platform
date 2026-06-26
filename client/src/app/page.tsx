
"use client";

import { useMemo } from "react";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { FeaturedEvent } from "@/components/FeaturedEvent";
import { LiveSessionsList } from "@/components/LiveSessionsList";
import { Sidebar } from "@/components/Sidebar";
import { useEvents } from "@/hooks/useEvents";
import { useLiveSessions } from "@/hooks/useLiveSessions";


export default function HomePage() {
  const { data: events, loading: eventsLoading } = useEvents();
  const { data: liveSessions, loading: liveLoading } = useLiveSessions();

  const featuredEvent = useMemo(() => {
    if (!events || events.length === 0) return null;
    return events[0];
  }, [events]);

  if (eventsLoading || liveLoading) {
    return (
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-center min-h-[60vh]">
          <LoadingSpinner />
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      {featuredEvent && <FeaturedEvent event={featuredEvent} />}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8">
          <div className="flex items-center gap-4 mb-10 border-b border-gray-100 pb-4">
            <h3 className="text-xl font-bold tracking-tight">Happening Now</h3>
            <div className="flex items-center gap-2 px-2 py-0.5 bg-red-50 text-red-600 rounded text-[10px] font-black uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
              </span>
              Live
            </div>
          </div>
          <LiveSessionsList sessions={liveSessions || []} />
        </div>
        <Sidebar />
      </div>
    </main>
  );
}
