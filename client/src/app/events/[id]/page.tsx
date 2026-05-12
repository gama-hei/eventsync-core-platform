'use client'
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { useParams } from "next/navigation";
import { Event } from "@/types/types";
import { useEffect, useState } from "react";




export default function EventCard() {
  const params = useParams();
  const id = params.id;
    const [event, setEvent] = useState<Event | null>(null);
  const [loading,setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    console.log("ID récupéré:", id);
    if(id){
      fetch(`http://localhost:8080/events/${id}`)  // ← AVEC backticks !
        .then(response => {
          if (!response.ok) {
            throw new Error('Event not found');
          }
          return response.json();
        })
        .then(data => {
          setEvent(data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [id]);
  // const { id, title, description, startDate, endDate, location, sessions } = event;
  if (loading) {
    return 
    <div>
      Loading Event {id} ...........
    </div>
  }
  if(!event){
    return null;
  }
  return (
    <>
      <div className="grid grid-col-3 gap-20   m-auto  ">
        <div className="grid grid-col-3  sm:grid-col-3 justify-center sm:flex  mx-auto gap-10 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
          <Card className="@container/card w-64 sm:w-48 lg:w-64 bg-card-first-bg ">
            <CardHeader>
              <CardDescription className="text-background">
                Event Start
              </CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {event.startDate.slice(0,10)}
              </CardTitle>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="text-background">{event.startDate.slice(11)}</div>
            </CardFooter>
          </Card>
          <Card className="@container/card w-64 sm:w-48 lg:w-64 = bg-card-second-bg">
            <CardHeader>
              <CardDescription>Event End</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {event.endDate.slice(0,10)}
              </CardTitle>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium"></div>
              <div>{event.endDate.slice(11)}</div>
            </CardFooter>
          </Card>
          <Card className="@container/card w-64 sm:w-48 lg:w-64  bg-card-last-bg">
            <CardHeader>
              <CardDescription>Event Avenue</CardDescription>
              <CardTitle className="text-sm font-semibold tabular-nums ">
                {event.location}
              </CardTitle>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium"></div>
              <div>{event.location}</div>
            </CardFooter>
          </Card>
        </div>
        <div className="grid grid-col-2 sm:flex justify-center gap-10 ">
          <Card
            className="relative w-full max-w-sm pt-0 cursor-pointer transition-all duration-200"
           
          >
            <CardHeader className="text-background ">
              <CardTitle className="text-2xl text-foreground">{event.title.toUpperCase()}</CardTitle>
              <CardDescription className="text-foreground">
                {event.description}
              </CardDescription>
            </CardHeader>
       
        
          </Card>

        </div>
      </div>
    </>
  );
}