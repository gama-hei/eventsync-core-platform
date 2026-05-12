import { Header } from "@/components/Header";
import { FeaturedEvent } from "@/components/FeaturedEvent";
import { LiveSessionsList } from "@/components/LiveSessionsList";
import { Sidebar } from "@/components/Sidebar";

import { getEvents, getLiveSessions } from "@/lib/api";

export default async function HomePage() {
  const [events, liveSessions] = await Promise.all([
    getEvents(),
    getLiveSessions(),
  ]);

  const featuredEvent = events?.[0];

  console.log("component mounted");
  

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 antialiased">
      <Header />

      <main className="max-w-6xl mx-auto px-6 py-12">
        {featuredEvent && (
          <FeaturedEvent event={featuredEvent} />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-4 mb-10 border-b border-gray-100 pb-4">
              <h3 className="text-xl font-bold tracking-tight">
                Happening Now
              </h3>

              <div className="flex items-center gap-2 px-2 py-0.5 bg-red-50 text-red-600 rounded text-[10px] font-black uppercase tracking-wider">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
                </span>

                Live
              </div>
            </div>

            <LiveSessionsList sessions={liveSessions} />
          </div>

          <Sidebar favoritesCount={0} />
        </div>
      </main>
    </div>
  );
}
