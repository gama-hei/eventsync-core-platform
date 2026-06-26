"use client";

import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/images/logo.png";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/90 backdrop-blur-lg">
      <div className="max-w-6xl mx-auto px-6 h-20 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src={logo}
            alt="EventSync"
            className="w-25 h-25 object-contain transition-transform duration-300"
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          <Link
            href="/speakers"
            className="text-base font-medium text-gray-700 hover:text-black transition-colors hover:scale-105"
          >
            Speakers
          </Link>
          <Link
            href="/rooms"
            className="text-base font-medium text-gray-700 hover:text-black transition-colors hover:scale-105"
          >
            Venues
          </Link>
          <Link
            href="/favorites"
            className="flex items-center gap-1.5 text-base font-medium text-gray-700 hover:text-black transition-colors hover:scale-105"
          >
            <Heart className="h-4.5 w-4.5 hover:fill-black transition-colors" />
            Favorites
          </Link>
          <Link
            href="/events"
            className="px-7 py-2.5 text-base font-medium bg-black text-white rounded-full"
          >
            Explore
          </Link>
        </nav>
      </div>
    </header>
  );
}
