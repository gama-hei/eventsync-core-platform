"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Session } from "@/types/types";
import { Divide, Speaker } from "lucide-react";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Mic2,
  Radio,
  Star,
  Calendar,
  MapPin,
  AlarmClockCheck,
  Clock,
} from "lucide-react";
import { error, log } from "console";
import { useParams } from "next/navigation";
import { API_BASE_URL } from "@/lib/constants";
import { isLive, getRoom, formatTime } from "@/app/events/[id]/page";
import { text } from "stream/consumers";
import { useFavorites } from "@/hooks/useFavorites";
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export default function SessionCards() {
  const params = useParams();
  const id = params.id;
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rooms, setRooms] = useState([]);
  const [roomName, setRoomName] = useState("");
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    console.log("ID récupéré:", id);
    if (id) {
      fetch(`${API_BASE_URL}/sessions/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Event not found");
          }
          return response.json();
        })
        .then((data) => {
          setSession(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [id]);
  useEffect(() => {
    getRoom()
      .then((data) => {
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
    return;
    <div>Loading Event {id} ...........</div>;
  }

  if (!session) {
    return;
    <div>
      <h1>No details found</h1>
    </div>;
  }
  const live = isLive(session.startTime, session.endTime);

  return (
    <>
      <div className="max-w-6xl mx-auto px-6 py-12">
        <section className="relative overflow-hidden rounded-3xl bg-[#FBFBFB] border border-card-last-bg p-8 md:p-20 mb-20">
          <div className="relative z-10 max-w-2xl">
            <Button type="button" className="bg-transparent">
              {live && <Radio className="text-red-500" />}
            </Button>

            <div className="inline-flex items-center gap-2 mb-8">
              <h1 className="text-sm font-bold uppercase p-2  bg-fill-button lg:text-2xl text-center border-background border-1 rounded-full text-button-blue">
                Sessions Details
              </span>
              <div className="inline-flex items-center gap-3 text-black px-10 py-4 bg-transparent font-bold text-base  transition-all">
                Add to favorite
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
            <h2 className="text-2xl md:text-5xl font-serif font-medium text-black mb-8 leading-tight tracking-tight">
              {session.title}
            </h2>
          
              <div className="grid grid-col-3 bg-card-last-bg p-5 gap-5 max-w-64 font-bold rounded-xl text-background mb-12">
                <h1 className="text-center ">Time & Place</h1>
                <div className="grid flex-wrap gap-8 mb-12 text-sm font-medium text-gray-500 mx-auto">
                  <div className="flex items-center gap-2 text-background">
                    <Clock className="h-4 w-4  group-hover:text-gray-600 transition-colors" />
                    <span className="font-mono text-sm ">
                      {formatTime(session.startTime)}
                    </span>
                    <span className="text-gray-300">—</span>
                    <span className="font-mono text-sm ">
                      {formatTime(session.endTime)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-background">
                    <Calendar className="h-4 w-4" />{" "}
                    {formatDate(session.startTime)}{" "}
                  </div>
                  <div className="flex items-center gap-2 text-background">
                    <MapPin className="h-4 w-4 " />
                    <Link
                      href={`/rooms/{roomId}/sessions`}
                      className="underline "
                    >
                      {roomName}
                    </Link>
                  </div>
                </div>
              </div>
              
             <div className="grid grid-col-2 gap-3 font-bold">
              <h1 className="text-xl">SESSION DECRIPTION</h1>
                <p  className="text-xl text-gray-800 font-normal mb-10 leading-relaxed italic border-2 border-card-last-bg rounded-xl p-3">
              {session.description}
            </p>
              </div>     
          

            <div className="flex flex-wrap gap-2 mb-12 text-sm font-medium text-gray-500">
              <div className="flex items-center gap-2">
                <Mic2 className="h-6 w-6 text-card-last-bg group-hover:text-gray-600 transition-colors" />
              </div>
              <div className="flex items-center gap-2 font-bold text-xl">
                Your Speaker :
                <Link href={`/speakers/${session.speakers[0].id}`}>
                  <span className="font-mono text-m text-gray-600 underline">
                    {session.speakers[0].fullName}
                  </span>
                </Link>
              </div>
            </div>

            <Link
              href={`/events/${session.eventId}`}
              className="inline-flex items-center gap-3 bg-black text-white px-10 py-4 rounded-full font-bold text-base hover:bg-zinc-800 transition-all"
            >
              <ArrowLeft className="h-4 w-4" /> Back To Event
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
