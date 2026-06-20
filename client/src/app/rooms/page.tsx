import { ArrowRight, Home, UsersRound } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { API_BASE_URL } from "@/lib/constants";
import { Room, room } from "@/types";

export const revalidate = 60;

async function getRooms(): Promise<Room[]> {
  const res = await fetch(`${API_BASE_URL}/rooms`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch rooms");
  return res.json();
}







export default async function RoomsPage() {
  const rooms = await getRooms();

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">

      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-black-500 hover:text-black-900 transition-colors"
        >
         <Home className="h-7 w-7" />
         <span className="text-2xl"> Back to Home </span>
        </Link>
      </div>

      <div className="mb-12">
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="w-10 h-3 bg-indigo-600" />
          <span className="text-2xl font-bold uppercase tracking-[0.2em] text-indigo-600">
            Event Place
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-black-900 mb-4 tracking-tight">
          All Rooms
        </h1>
        <p className="text-black-500 text-lg">
          {rooms.length} room{rooms.length > 1 ? "s" : ""} at this event
        </p>
      </div>

      {rooms.length === 0 ? (
        <div className="text-center py-20 bg-black-50 rounded-2xl">
          <p className="text-black-400 mb-4">No rooms available</p>
          <Link href="/" className="inline-block text-indigo-600 hover:text-indigo-700 font-medium">
            Back to home
          </Link>
        </div>
      ) : (
        <div className=" space-y-8 flex flex-wrap gap-9">
          {rooms.map((room) => {
            
            
            return (
              <article key={room.id} className="group border-b border-b-5 rounded border-fill-back pb-8 last:border-0 transition-all duration-300 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl">
                <div className="flex flex-col md:flex-row md:items-start gap-6 p-5 ">
                
                 

                  <div className="flex-1 min-w-0">
                    <Link href={`/rooms/${room.id}/sessions`}>
                      <h2 className="text-2xl font-serif font-semibold text-black-900 group-hover:text-indigo-600 transition-colors mb-2">
                        {room.name}
                      </h2>
                    </Link>

                  
                      <p className="text-black-500 leading-relaxed line-clamp-2 mb-4">
                        {room.location}
                      </p>
                    
                          <div className="flex gap-2">
            <UsersRound />
            <p className="text-lg text-black-500 font-normal mb-10">
              Capacity: {room.capacity} persons
            </p>
          </div>

                    <Link href={`/rooms/${room.id}/sessions`}>
                      <div className="flex items-center gap-1 text-indigo-600 font-medium mt-4 group-hover:gap-2 transition-all">
                        <span>View sessions</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  </div>

                </div>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}