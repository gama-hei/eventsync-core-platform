"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-900">
          EventSync
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/speakers"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Speakers
          </Link>
          <Link
            href="/rooms"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Venues
          </Link>
          <Link
            href="/favorites"
            className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Heart className="h-4 w-4" />
            Favorites
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
