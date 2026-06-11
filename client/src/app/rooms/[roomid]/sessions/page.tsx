"use client";
import { API_BASE_URL } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Room, Session } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { isLive } from "@/app/events/[id]/page";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  ArrowLeft,
  Heart,
  Mic2,
  DoorOpen,
  UsersRound,
  Radio,
} from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";

export default function SessionsPage() {
  const params = useParams();
  const roomid = params.roomid;

  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {isFavorite, toggleFavorite} = useFavorites();

  const [likedSessions, setLikedSessions] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    console.log("roomid:", roomid);

    if (roomid) {
      const url = `${API_BASE_URL}/rooms/${roomid}/sessions`;
      console.log("Fetching URL:", url);

      fetch(url)
        .then((res) => {
          console.log("Response status:", res.status);
          if (!res.ok) {
            throw new Error(`HTTP ${res.status}: ${res.statusText}`);
          }
          return res.json();
        })
        .then((data) => {
          console.log("Data received:", data);
          setRoom(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Fetch error:", err);
          setError(err.message);
          setLoading(false);
        });
    } else {
      console.log("No roomid found in params");
    }
  }, [roomid]);

  const toggleLike = (sessionId: string) => {
    setLikedSessions((prev) => ({
      ...prev,
      [sessionId]: !prev[sessionId],
    }));
  };

  // Formater la date
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Formater l'heure
  const formatTime = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading)
    return (
      <div className="max-w-6xl mx-auto px-6 py-12 text-center">
        Chargement...
      </div>
    );
  if (error)
    return (
      <div className="max-w-6xl mx-auto px-6 py-12 text-center text-red-600">
        Erreur: {error}
      </div>
    );
  if (!room)
    return (
      <div className="max-w-6xl mx-auto px-6 py-12 text-center">
        Aucune salle trouvée
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <section className="relative overflow-hidden rounded-3xl bg-[#FBFBFB] border border-gray-100 p-8 md:p-20 mb-20">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 mb-8">
            <span className="w-8 h-px bg-indigo-600" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
              Room Details
            </span>
          </div>

          <h2 className="text-2xl md:text-5xl font-serif font-bold bg-red-600 text-black mb-4 leading-tight tracking-tight"></h2>
          <div className="flex gap-2">
            <DoorOpen />
            <p className="text-xl text-gray-600 font-normal mb-4 leading-relaxed">
              {room.roomName}
            </p>
          </div>

          <div className="flex gap-2">
            <UsersRound />
            <p className="text-lg text-gray-500 font-normal mb-10">
              Capacity: {room.capacity} persons
            </p>
          </div>

          <div className="space-y-8 mt-6 border-t border-gray-400 pt-5">
            <h3 className="text-2xl font-bold text-black">Sessions lists</h3>

            {room.sessions && room.sessions.length > 0 ? (
              room.sessions.map((session: Session) => {
                // Déclarer la variable live pour chaque session
                const live = isLive(session.startTime, session.endTime);
                // Récupérer l'état de like pour cette session
                const isLiked = likedSessions[session.id] || false;

                return (
                  <div
                    key={session.id}
                    className="border-1 border-card-last-bg p-8 first:border-t-0 rounded-xl"
                  >
                    {/* Afficher le bouton live UNIQUEMENT si la session est en cours */}
                    {live && (
                      <Button type="button" className="bg-transparent mb-4 p-0">
                        <div className="flex items-center gap-2">
                          <Radio className="text-red-500 !h-6 !w-6 animate-pulse" />
                          <span className="text-red-500 font-bold text-sm uppercase tracking-wider">
                            LIVE NOW
                          </span>
                        </div>
                      </Button>
                    )}

                    <div className="inline-flex items-center gap-2">
                      <span className="text-xl font-bold uppercase tracking-[0.2em] text-indigo-600">
                        {session.title}
                      </span>
                      <div className="inline-flex items-center gap-3 text-black px-10 py-4 bg-transparent font-bold text-base transition-all">
                
                                 <Heart
onClick={() => session && toggleFavorite(session)}
className={`h-6 w-6 cursor-pointer transition-colors ${
session && isFavorite(session.id)
? "fill-red-500 text-red-500"
: "text-gray-400"
}`}
/>
                      </div>
                    </div>

                    <p className="text-gray-600 font-normal mb-6 leading-relaxed">
                      {session.description || "Aucune description disponible"}
                    </p>

                    <div className="flex flex-wrap gap-8 mb-12 text-sm font-medium text-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />{" "}
                        {formatDate(session.startTime)}{" "}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 group-hover:text-gray-600 transition-colors" />
                        <span className="font-mono text-sm">
                          {formatTime(session.startTime)}
                        </span>
                        <span>—</span>
                        <span className="font-mono text-sm">
                          {formatTime(session.endTime)}
                        </span>
                      </div>
                    </div>

                    {/* Speakers */}
                    {session.speakers && session.speakers.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6 text-sm font-medium text-gray-500">
                        <div className="flex items-center gap-2">
                          <Mic2 className="h-6 w-6 text-black" />
                        </div>
                        <div className="flex items-center gap-2 font-medium text-black">
                          Speaker(s):
                          {session.speakers.map((speaker, idx) => (
                            <span key={speaker.id}>
                              <Link href={`/speakers/${speaker.id}`}>
                                <span className="font-bold text-m text-gray-800 underline">
                                  {speaker.fullName}
                                </span>
                              </Link>
                              {idx < session.speakers.length - 1 && ", "}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <Link
                      href={`/sessions/${session.id}`}
                      className="inline-flex items-center gap-3 bg-black text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-zinc-800 transition-all"
                    >
                      <ArrowLeft className="h-4 w-4" /> See Sessions
                    </Link>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500 italic">
                Aucune session programmée dans cette salle
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
