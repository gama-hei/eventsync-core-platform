"use client";

import { Mail, Globe, Share2, MessageSquare } from 'lucide-react';
import { Speaker } from "@/types/types";

export default function SpeakerHero({ speaker }: { speaker: Speaker }) {
  const { fullName, bio, profilePicture, externalLinks } = speaker;

  return (
    <div className="w-full text-white space-y-8 md:space-y-0 md:flex md:gap-8 items-center justify-between pb-12">
      {/* Profil de gauche */}
      <div className="bg-[#1e232a] rounded-2xl p-8 flex flex-col items-center justify-center text-center w-full md:w-1/3 border border-slate-800 shadow-xl">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-700 mb-4">
          <img 
            src={profilePicture || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400"} 
            alt={fullName} 
            className="w-full h-full object-cover" 
          />
        </div>
        <h3 className="text-xl font-bold tracking-wide">{fullName}</h3>
        <p className="text-sm text-gray-400 mt-1">Speaker</p>
      </div>

      <div className="w-full md:w-2/3 flex flex-col justify-between h-full space-y-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">{fullName}</h1>
          <div className="bg-[#1e232a]/60 backdrop-blur-sm border border-slate-800 rounded-xl p-6 text-gray-300 leading-relaxed text-sm md:text-base">
            {bio || "No biography available for this speaker."}
          </div>
        </div>

        <div className="flex gap-6 pt-4 text-gray-400 justify-start">
          {externalLinks?.linkedin && (
            <a href={externalLinks.linkedin} target="_blank" rel="noreferrer" title="LinkedIn" className="hover:text-blue-500 transition-colors">
              <Share2 className="w-6 h-6" />
            </a>
          )}
          {externalLinks?.twitter && (
            <a href={externalLinks.twitter} target="_blank" rel="noreferrer" title="Twitter" className="hover:text-sky-400 transition-colors">
              <MessageSquare className="w-6 h-6" />
            </a>
          )}
          {externalLinks?.website && (
            <a href={externalLinks.website} target="_blank" rel="noreferrer" title="Website" className="hover:text-blue-600 transition-colors">
              <Globe className="w-6 h-6" />
            </a>
          )}
          <a href="#" title="Email" className="hover:text-gray-200 transition-colors"><Mail className="w-6 h-6" /></a>
        </div>
      </div>
    </div>
  );
}