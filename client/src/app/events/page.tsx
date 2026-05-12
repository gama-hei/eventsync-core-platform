import { Calendar, MapPin, MessageCircle, ArrowRight, Home } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { API_BASE_URL } from "@/lib/constants";
import { Event } from "@/types";

export const revalidate = 60;

async function getEvents(): Promise<Event[]> {
  const res = await fetch(`${API_BASE_URL}/events`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }

  return res.json();
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Back to Home button */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4 tracking-tight">
            All Events
          </h1>
          <p className="text-gray-500 text-lg">
            Discover conferences, workshops, and meetups
          </p>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-2xl">
            <p className="text-gray-400">No events available</p>
            <Link
              href="/"
              className="inline-block mt-4 text-indigo-600 hover:text-indigo-700 font-medium"
            >
              ← Back to home
            </Link>
          </div>
        ) : (
          <div className="space-y-12">
            {events.map((event) => (
              <article key={event.id} className="group border-b border-gray-100 pb-8 last:border-0">
                <Link href={`/events/${event.id}`}>
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="md:w-1/4">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-600">
                        <Calendar className="h-3.5 w-3.5" />
                        <span className="font-medium">{formatDate(event.startDate)}</span>
                      </div>
                    </div>
                    <div className="md:w-3/4">
                      <h2 className="text-2xl md:text-3xl font-serif font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors mb-2">
                        {event.title}
                      </h2>
                      <p className="text-gray-500 leading-relaxed line-clamp-2">
                        {event.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MessageCircle className="h-4 w-4" />
                          <span>{event.sessions?.length || 0} sessions</span>
                        </div>
                      </div>
                      <div className="flex items-center text-indigo-600 font-medium mt-4 group-hover:gap-2 transition-all">
                        <span>View event details</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
