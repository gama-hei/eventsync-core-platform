"use client";

import Link from "next/link";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { Event } from "@/types";
import { formatDate } from "@/lib/utils";

export function FeaturedEvent({ event }: { event: Event }) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-[#FBFBFB] border border-gray-100 p-8 md:p-20 mb-20">
      <div className="relative z-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 mb-8">
          <span className="w-20 h-3 bg-indigo-600" />
          <span className="text-2xl font-bold uppercase tracking-[0.2em] text-indigo-600">
            Featured Event
          </span>
        </div>
        <h2 className="text-5xl md:text-7xl font-serif font-medium text-black mb-8 leading-tight tracking-tight">
          {event.title}
        </h2>
        <p className="text-xl text-gray-600 font-normal mb-10 leading-relaxed italic">
          {event.description}
        </p>
        <div className="flex flex-wrap gap-8 mb-12 text-sm font-medium text-gray-500">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" /> {formatDate(event.startDate)}
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" /> {event.location}
          </div>
        </div>
        <Link
          href={`/events/${event.id}`}
          className="inline-flex items-center gap-3 bg-black text-white px-10 py-4 rounded-full font-bold text-base hover:bg-zinc-800 transition-all"
        >
          Full Program <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
