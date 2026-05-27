"use client";

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Speaker } from "@/types/types";
import Link from 'next/navigation'; // 1. Importation du Link (ou 'next/link')
import LinkComponent from 'next/link'; // Utilise l'import standard de Next.js pour la navigation

export default function AllSpeakers({ speakers }: { speakers: Speaker[] }) {
  return (
    <div className="my-16">
      <h2 className="text-2xl font-bold text-white mb-8">All Speakers</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-start">
        {speakers.map((speaker) => (
          // Ajout d'un lien cliquable sur l'avatar du speaker pour pouvoir naviguer entre profils
          <LinkComponent href={`/speaker/${speaker.id}`} key={speaker.id} className="block group">
            <div className="bg-[#1e232a]/40 border border-slate-800/60 p-4 rounded-xl flex flex-col items-center text-center group-hover:bg-[#1e232a] transition-all">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-slate-700 mb-3 group-hover:border-blue-500 transition-colors">
                <img 
                  src={speaker.profilePicture || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400"} 
                  alt={speaker.fullName} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <h4 className="text-white font-semibold text-sm line-clamp-1">{speaker.fullName}</h4>
              <p className="text-xs text-gray-500 mt-1 line-clamp-1">Speaker</p>
            </div>
          </LinkComponent>
        ))}

        <button className="border-2 border-dashed border-slate-700 bg-transparent hover:border-blue-500 hover:bg-[#1e232a]/50 transition-all p-4 rounded-xl flex flex-col items-center justify-center text-center text-gray-400 hover:text-white h-full min-h-[145px] w-full cursor-pointer">
          <div className="w-10 h-10 rounded-full border border-gray-500 flex items-center justify-center mb-2 group-hover:border-white">
            <Plus className="w-5 h-5" />
          </div>
          <span className="text-xs font-medium">Become a Speaker</span>
        </button>
      </div>

      <div className="flex justify-center mt-10">
        <LinkComponent href="/speaker"> 
          <Button className="bg-[#ff4655] hover:bg-[#e03e4b] text-white font-semibold px-8 py-2 rounded-md transition-colors cursor-pointer">
            See All Speakers
          </Button>
        </LinkComponent>
      </div>
    </div>
  );
}