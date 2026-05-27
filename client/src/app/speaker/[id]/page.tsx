"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { API_BASE_URL } from "@/lib/constants";
import { Session } from "@/types/types";
import SpeakerHero from "../components/SpeakerHero";
import SpeakerSessions from "../components/SpeakerSessions";
import AllSpeakers from "../components/AllSpeakers";
import NewsletterFooter from "../components/NewsletterFooter";

export default function SpeakerProfilePage() {
  const { id } = useParams() as { id: string };
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`${API_BASE_URL}/sessions/${id}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          setSession(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f1319] flex items-center justify-center text-white font-mono">
        Loading...
      </div>
    );
  }

  if (!session || !session.speakers?.length) {
    return (
      <div className="min-h-screen bg-[#0f1319] flex items-center justify-center text-red-400">
        No Speaker found for this session.
      </div>
    );
  }

  const mainSpeaker = session.speakers[0];

  return (
    <div className="min-h-screen bg-[#0f1319] text-slate-100 antialiased">
      <div className="max-w-6xl mx-auto px-6 py-12">
        
        <SpeakerHero speaker={mainSpeaker} />

        <SpeakerSessions speakerName={mainSpeaker.fullName} sessions={[session]} />

        <AllSpeakers speakers={session.speakers} />

        <NewsletterFooter />
      </div>
    </div>
  );
}