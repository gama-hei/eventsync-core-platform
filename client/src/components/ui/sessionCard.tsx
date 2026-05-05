"use client";
import { useState } from "react";
import { Button } from "./button";
import { Session } from "@/types/types";
import {
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Heart, Radio } from "lucide-react";

interface Props {
  sessions: Session[];
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const getDateOnly = (dateStr: string) => dateStr.slice(0, 10);

export function SessionCards({ sessions = [] }: Props) {
  const uniqueDates = [...new Set(sessions.map((s) => getDateOnly(s.startTime)))];
  const [currentDateIndex, setCurrentDateIndex] = useState(0);

  const currentDate = uniqueDates[currentDateIndex];
  const filteredSessions = sessions.filter(
    (s) => getDateOnly(s.startTime) === currentDate
  );

  const handlePrevious = () => {
    setCurrentDateIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentDateIndex((prev) => Math.min(prev + 1, uniqueDates.length - 1));
  };

  return (
    <>
      <div className="m-auto w-[40vw] pb-5">
        <CardHeader className="w-full">
          <CardTitle className="text-4xl text-center text-background">
            Conference Schedule
          </CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mollis
            quam malesuada scelerisque ultrices gravida
          </CardDescription>
          <CardTitle className="text-2xl text-center text-background">
            {currentDate ? formatDate(currentDate) : "No sessions"}
          </CardTitle>
        </CardHeader>
      </div>

      <div>
        {filteredSessions.map(
          ({
            id,
            title,
            description,
            startTime,
            endTime,
            room: { name: roomName },
            capacity = 0,
            speakers,
            isLive = false,
          }) => (
            <div key={id}>
              <div className="flex justify-between py-10 bg-card-bg-session w-[40vw] mx-auto px-4 text-background mb-4">
                <h1 className="flex items-center text-center font-bold">
                  {startTime.slice(11, 16)} - {endTime.slice(11, 16)}
                </h1>
                <div className="grid grid-col-2 w-96">
                  <CardTitle className="text-xl font-bold">{title}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button type="button" className="bg-transparent">
                    <Heart size={24} strokeWidth={1.5} />
                  </Button>
                  <Button type="button" className="bg-transparent">
                    {isLive && <Radio className="text-red-500" />}
                  </Button>
                </div>
              </div>
            </div>
          )
        )}
      </div>

      <div className="flex justify-around m-auto w-[40vw] pb-5">
        <Button
          type="button"
          className="bg-blue-500 w-24"
          onClick={handlePrevious}
          disabled={currentDateIndex === 0}
        >
          <ArrowLeft size={256} strokeWidth={50} absoluteStrokeWidth />
          Previous
        </Button>
        <Button
          type="button"
          className="bg-blue-500 w-24"
          onClick={handleNext}
          disabled={currentDateIndex === uniqueDates.length - 1}
        >
          <span>Next</span>
          <ArrowRight size={256} strokeWidth={50} absoluteStrokeWidth />
        </Button>
      </div>
    </>
  );
}