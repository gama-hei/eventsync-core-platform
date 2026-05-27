"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Session, Room } from "@/types/types";
import Link from "next/link";
import { useParams } from "next/navigation";

import {
  ArrowLeft,
  Heart,
  Mic2,
  Radio,
  Calendar,
  MapPin,
  Clock,
} from "lucide-react";

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const formatTime = (dateString: string): string => {
  return new Date(dateString).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const isLive = (startTime: string, endTime: string): boolean => {
  const now = new Date();
  const start = new Date(startTime);
  const end = new Date(endTime);
  return now >= start && now <= end;
};

export default function SessionCards() {
  const params = useParams() as { id: string };
  const id = params.id;
  
  const [session, setSession] = useState<Session | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [roomName, setRoomName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [liked, setLiked] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      fetch(`/api/sessions/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Session not found");
          }
          return response.json();
        })
        .then((data: Session) => {
          setSession(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Erreur chargement session:", err);
          setLoading(false);
        });
    }
  }, [id]);

  useEffect(() => {
    fetch("/api/rooms")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch rooms");
        }
        return response.json();
      })
      .then((data: Room[]) => {
        if (data) {
          setRooms(data);
        }
      })
      .catch((err) => {
        console.error("Erreur chargement rooms:", err);
      });
  }, []);

  useEffect(() => {
    if (session && rooms.length > 0) {
      const room = rooms.find((r) => r.id === session.roomId);
      setRoomName(room?.name || "Salle non trouvée");
    }
  }, [session, rooms]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-mono text-gray-500">
        Loading Session {id} ...........
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 font-bold">
        <h1>No details found</h1>
      </div>
    );
  }

  const live = isLive(session.startTime, session.endTime);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <section className="relative overflow-hidden rounded-3xl bg-[#FBFBFB] border border-card-last-bg p-8 md:p-20 mb-20">
        <div className="relative z-10 max-w-2xl">
          <Button type="button" className="bg-transparent p-0 hover:bg-transparent">
            {live && <Radio className="text-red-500 animate-pulse" />}
          </Button>

          <div className="inline-flex items-center gap-2 mb-8">
            <h1 className="text-sm font-bold uppercase p-2 bg-fill-button lg:text-2xl text-center border-background border-1 rounded-full text-button-blue">
              Sessions Details
            </h1>
            <div className="inline-flex items-center gap-3 text-black px-10 py-4 bg-transparent font-bold text-base transition-all">
              Add to favorite
              <Heart
                onClick={() => setLiked(!liked)}
                className={`h-6 w-6 cursor-pointer transition-colors ${
                  liked ? "fill-red-500 text-red-500" : "text-gray-400"
                }`}
              />
            </div>
          </div>
          <h2 className="text-2xl md:text-5xl font-serif font-medium text-black mb-8 leading-tight tracking-tight">
            {session.title}
          </h2>
        
          <div className="grid grid-cols-1 bg-card-last-bg p-5 gap-5 max-w-64 font-bold rounded-xl text-background mb-12">
            <h1 className="text-center">Time & Place</h1>
            <div className="grid gap-4 mb-2 text-sm font-medium text-gray-500 mx-auto">
              <div className="flex items-center gap-2 text-background">
                <Clock className="h-4 w-4" />
                <span className="font-mono text-sm">
                  {formatTime(session.startTime)}
                </span>
                <span className="text-gray-300">—</span>
                <span className="font-mono text-sm">
                  {formatTime(session.endTime)}
                </span>
              </div>
              <div className="flex items-center gap-2 text-background">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(session.startTime)}</span>
              </div>
              <div className="flex items-center gap-2 text-background">
                <MapPin className="h-4 w-4" />
                <Link
                  href={`/rooms/${session.roomId}/sessions`}
                  className="underline hover:text-indigo-200 transition-colors"
                >
                  {roomName}
                </Link>
              </div>
            </div>
          </div>
            
          <div className="grid gap-3 font-bold">
            <h1 className="text-xl">SESSION DESCRIPTION</h1>
            <p className="text-xl text-gray-800 font-normal mb-10 leading-relaxed italic border-2 border-card-last-bg rounded-xl p-3">
              {session.description || "No description provided."}
            </p>
          </div>     

          {session.speakers && session.speakers.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-12 text-sm font-medium text-gray-500">
              <div className="flex items-center gap-2">
                <Mic2 className="h-6 w-6 text-card-last-bg" />
              </div>
              <div className="flex items-center gap-2 font-bold text-xl">
                Your Speaker :
                <Link href={`/speaker/${session.speakers[0].id}`}>
                  <span className="font-mono text-m text-gray-600 underline hover:text-indigo-600 transition-colors">
                    {session.speakers[0].fullName}
                  </span>
                </Link>
              </div>
            </div>
          )}

          <Link
            href={`/events/${session.eventId}`}
            className="inline-flex items-center gap-3 bg-black text-white px-10 py-4 rounded-full font-bold text-base hover:bg-zinc-800 transition-all"
          >
            <ArrowLeft className="h-4 w-4" /> Back To Event
          </Link>
        </div>
      </section>
    </div>
  );
}