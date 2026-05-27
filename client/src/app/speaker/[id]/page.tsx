"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SpeakerHero from "../components/SpeakerHero";
import SpeakerSessions from "../components/SpeakerSessions";
import AllSpeakers from "../components/AllSpeakers";
import NewsletterFooter from "../components/NewsletterFooter";


export default function SpeakerProfilePage() {
  const { id } = useParams() as { id: string };
  const [speaker, setSpeaker] = useState<any | null>(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`/api/speakers/${id}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          setSpeaker(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Erreur chargement speaker:", err);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f1319] flex items-center justify-center text-white font-mono">
        Loading Speaker...
      </div>
    );
  }

  if (!speaker) {
    return (
      <div className="min-h-screen bg-[#0f1319] flex items-center justify-center text-red-400">
        No Speaker found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1319] text-slate-100 antialiased">
      <div className="max-w-6xl mx-auto px-6 py-12">
        
        <SpeakerHero speaker={speaker} />

        <SpeakerSessions speakerName={speaker.fullName} sessions={speaker.sessions || []} />

        <AllSpeakers speakers={[speaker]} />

        <NewsletterFooter />
      </div>
    </div>
  );
}