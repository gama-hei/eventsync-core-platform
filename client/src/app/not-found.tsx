"use client";

import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      <div className="text-center">
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-gray-50 rounded-3xl flex items-center justify-center">
            <Search className="h-12 w-12 text-gray-300" />
          </div>
        </div>
        <h1 className="text-4xl font-serif font-semibold text-black mb-3">
          Page not found
        </h1>
        <p className="text-gray-500 text-base mb-8 max-w-sm mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all hover:gap-3"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
