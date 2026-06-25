
import { Calendar, Clock, DoorOpen, Users } from "lucide-react";
import { formatDate, formatTime } from "@/lib/utils";

interface SessionInfoProps {
  startTime: string;
  endTime: string;
  roomName: string;
  capacity: number;
}

export function SessionInfo({ startTime, endTime, roomName, capacity }: SessionInfoProps) {
  return (
    <div className="flex flex-wrap gap-6 text-sm text-gray-400 border-b border-gray-100 pb-8 mb-10">
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4" />
        <span>{formatDate(startTime)}</span>
      </div>
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4" />
        <span>{formatTime(startTime)} — {formatTime(endTime)}</span>
      </div>
      <div className="flex items-center gap-2">
        <DoorOpen className="h-4 w-4" />
        <span>{roomName || "TBD"}</span>
      </div>
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4" />
        <span>{capacity || "Unlimited"}</span>
      </div>
    </div>
  );
}
