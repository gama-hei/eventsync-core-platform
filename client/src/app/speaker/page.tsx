"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Speaker } from "@/types/types";
import { ArrowLeft, Mic2 } from "lucide-react";

export default function AllSpeakersPage() {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Appel de l'endpoint global des speakers via le proxy Next.js
    fetch("/api/speakers")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch speakers");
        return res.json();
      })
      .then((data: Speaker[]) => {
        setSpeakers(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération des speakers :", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f1319] flex items-center justify-center text-white font-mono">
        Loading all speakers...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1319] text-slate-100 antialiased py-12 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Bouton Retour à l'accueil */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        {/* En-tête */}
        <div className="mb-12 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-3 mb-2">
            <Mic2 className="h-6 w-6 text-[#ff4655]" />
            <h1 className="text-4xl font-serif font-bold tracking-tight text-white">
              Our Event Speakers
            </h1>
          </div>
          <p className="text-gray-400 text-lg">
            Meet the experts, innovators, and leaders sharing their knowledge.
          </p>
        </div>

        {/* Grille des Speakers */}
        {speakers.length === 0 ? (
          <div className="text-center py-20 bg-[#1e232a]/20 border border-slate-800 rounded-2xl">
            <p className="text-gray-400">No speakers available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {speakers.map((speaker) => (
              <Link 
                href={`/speaker/${speaker.id}`} 
                key={speaker.id} 
                className="group block bg-[#1e232a]/40 border border-slate-800/60 p-5 rounded-2xl hover:bg-[#1e232a] hover:border-slate-700 transition-all text-center"
              >
                {/* Avatar */}
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-slate-700 mx-auto mb-4 group-hover:border-[#ff4655] transition-colors">
                  <img
                    src={speaker.profilePicture || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400"}
                    alt={speaker.fullName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <h3 className="text-white font-semibold text-base line-clamp-1 group-hover:text-[#ff4655] transition-colors">
                  {speaker.fullName}
                </h3>
                <p className="text-xs text-gray-400 mt-1 line-clamp-1">
                    {(speaker as any).company || "Guest Speaker"}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}