"use client";

import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-20 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-black tracking-tighter text-black">
            EventSync
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/schedule"
            className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
          >
            Schedule
          </Link>
          <Link
            href="/rooms"
            className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
          >
            Venues
          </Link>
          <Link
            href="/events"
            className="px-6 py-2 text-sm font-medium bg-black text-white rounded-full hover:bg-gray-800 transition-all"
          >
            Explore
          </Link>
        </nav>
      </div>
    </header>
  );
}
