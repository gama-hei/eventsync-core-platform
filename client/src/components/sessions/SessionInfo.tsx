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
    <div className="flex flex-wrap gap-8 text-sm border-b border-gray-200 pb-8 mb-10">
      <div className="flex items-center gap-3">
        <Calendar className="h-5 w-5 text-gray-500" />
        <span className="text-gray-800 font-medium">{formatDate(startTime)}</span>
      </div>
      <div className="flex items-center gap-3">
        <Clock className="h-5 w-5 text-gray-500" />
        <span className="text-gray-800 font-medium">
          {formatTime(startTime)} — {formatTime(endTime)}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <DoorOpen className="h-5 w-5 text-gray-500" />
        <span className="text-gray-800 font-medium">{roomName || "TBD"}</span>
      </div>
      <div className="flex items-center gap-3">
        <Users className="h-5 w-5 text-gray-500" />
        <span className="text-gray-800 font-medium">{capacity || "Unlimited"}</span>
      </div>
    </div>
  );
}
