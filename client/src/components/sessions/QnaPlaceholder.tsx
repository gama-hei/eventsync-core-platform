
import { Clock } from "lucide-react";
import { formatDate, formatTime } from "@/lib/utils";

interface QnaPlaceholderProps {
  startTime: string;
}

export function QnaPlaceholder({ startTime }: QnaPlaceholderProps) {
  return (
    <div className="border-t border-gray-100 pt-10">
      <div className="text-center py-16">
        <Clock className="h-12 w-12 text-gray-200 mx-auto mb-3" />
        <p className="text-gray-500 font-light">
          Q&A will be available when the session starts
        </p>
        <p className="text-sm text-gray-400 font-light mt-1">
          {formatDate(startTime)} at {formatTime(startTime)}
        </p>
      </div>
    </div>
  );
}
