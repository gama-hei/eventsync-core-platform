
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface SessionHeaderProps {
  eventId: string;
}

export function SessionHeader({ eventId }: SessionHeaderProps) {
  return (
    <div className="mb-10">
      <Link
        href={`/events/${eventId}`}
        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-black transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to event
      </Link>
    </div>
  );
}
