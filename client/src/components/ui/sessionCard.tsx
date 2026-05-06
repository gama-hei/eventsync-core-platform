"use client";
import { Button } from "./button";
import { Session } from "@/types/types";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Heart, Radio } from "lucide-react";

interface Props {
  sessions: Session[];
}

export function SessionCards({ sessions }: Props) {
  return (
    <>
      <div>
        {sessions.map(
          ({
            id,
            eventId,
            title,
            description,
            startTime,
            endTime,
            room: { id: roomId, name: roomName, capacity: roomCapacity },
            capacity = 0,
            speakers,
            isLive = false,
          }) => (
            <div
              key={id}
              className="flex justify-between py-10 bg-card-bg-session w-[40vw] mx-auto px-4 text-background mb-4"
            >
              <h1 className="flex items-center text-center font-bold">
                {startTime.slice(11, 16)} - {endTime.slice(11, 16)}
              </h1>
              <div className="grid grid-col-2 w-96">
                <CardTitle className="text-xl font-bold">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button type="submit" className="bg-transparent">
                  <Heart
                    size={24}
                    strokeWidth={1.5}
                  />
                </Button>
                <Button type="submit" className="bg-transparent">
                  {isLive && <Radio className="text-red-500" />}
                </Button>
              </div>
            </div>
          ),
        )}
      </div>
    </>
  );
}
