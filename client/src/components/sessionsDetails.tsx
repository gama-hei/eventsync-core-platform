"use client"
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Session } from "@/types/index";
import { Divide, Link } from "lucide-react";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Heart, Radio, Star } from "lucide-react";
import { error } from "console";
import { useParams } from "next/navigation";
import { API_BASE_URL } from "@/lib/constants";
import { isLive, getRoom  } from "@/app/events/[id]/page";
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export function SessionCards() {
  const params = useParams();
  const id = params.id;
  const [session, setSession] = useState<Session | null >(null);
  const [loading,setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const rooms =  getRoom();
   console.log("session Details");

  useEffect(() => {
    console.log("ID récupéré:", id);
    if(id){
      fetch( `${API_BASE_URL}/sessions/${id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Event not found');
          }
          return response.json();
        })
        .then(data => {
          setSession(data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [id]);
   if (loading) {
    return
    <div>
      Loading Event {id} ...........
    </div>
  }

if(!session){
  return
  <div>
    <h1>No details found</h1>
  </div>

}
const live = isLive(session.startTime, session.endTime);

  return (
    <>

      <div>

            <div className="flex overflow-hidden  justify-between py-10 bg-card-bg-session lg:w-[40vw] gap-4 mx-auto px-4 text-background mb-4 cursor-pointer ">



              <div ></div>
              <h1 className="flex items-center text-center font-bold">
                {session.startTime.slice(11, 16)}
              </h1>
              <div className="grid grid-col-2 w-96">
                <CardTitle className="text-sm font-bold lg:text-2xl">
                  <a href="/sessionsDetails" className="underline">
                    {session.title}
                  </a>
                </CardTitle>
                <CardDescription className="text-[10px] lg:text-[15px]">
                  {session.description}
                </CardDescription>
                <CardTitle className="text-sm font-bold lg:text-2xl">
                  <a href="/sessionsDetails" className="underline">

                  </a>
                </CardTitle>
                <CardTitle className="text-sm font-bold lg:text-2xl">
                  <a href="/sessionsDetails" className="underline">
                    Speaker :
                  </a>
                </CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <Button type="button" className="bg-transparent cursor-pointer">
                  <Star size={24} strokeWidth={1.5} />
                </Button>
                <Button type="button" className="bg-transparent">
                  {live && <Radio className="text-red-500" />}
                </Button>
              </div>
              <div className="mx-auto  max-w-md overflow-hidden pb-5 pt-5 sm:pt-20 md:max-w-2xl "></div>
            </div>

      </div>


    </>
  );
}
