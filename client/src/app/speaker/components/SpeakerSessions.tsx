"use client";

import { MapPin } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Session } from "@/types/types";

interface SpeakerSessionsProps {
  speakerName: string;
  sessions: Session[];
}

export default function SpeakerSessions({ speakerName, sessions }: SpeakerSessionsProps) {
  return (
    <div className="my-16">
      <div className="flex items-center justify-center gap-4 mb-10">
        <div className="h-[2px] w-16 bg-gradient-to-r from-blue-500 to-transparent" />
        <h2 className="text-xl md:text-2xl font-bold text-white text-center">
          Look the Sessions with <span className="text-blue-500">{speakerName}</span>
        </h2>
        <div className="h-[2px] w-16 bg-gradient-to-l from-gray-500 to-transparent" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sessions.map((session) => {
          const dateObj = new Date(session.startTime);
          const day = dateObj.getDate().toString();
          const month = dateObj.toLocaleDateString("en-US", { month: "short" });

          return (
            <Card key={session.id} className="bg-[#1e232a] border-slate-800 overflow-hidden hover:scale-102 transition-all duration-300 rounded-2xl group">
              <div className="h-44 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500" 
                  alt={session.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>

              <CardContent className="p-5 text-slate-900 bg-white rounded-b-2xl">
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center bg-blue-50 text-blue-600 px-3 py-1 rounded-xl font-bold min-w-[50px]">
                    <span className="text-xs uppercase tracking-wider">{month}</span>
                    <span className="text-lg leading-none">{day}</span>
                  </div>

                  <div className="space-y-3 flex-1">
                    <h4 className="font-bold text-sm md:text-base line-clamp-2 leading-snug">{session.title}</h4>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span className="line-clamp-1">{session.room?.name || "Main Room"}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}