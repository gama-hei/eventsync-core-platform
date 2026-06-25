
import Link from "next/link";
import { Mic2, Heart } from "lucide-react";
import { Speaker } from "@/types";

interface SpeakersListProps {
  speakers: Speaker[];
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function SpeakersList({ speakers, isFavorite, onToggleFavorite }: SpeakersListProps) {
  if (!speakers || speakers.length === 0) return null;

  return (
    <div className="mb-12 border-b border-gray-100 pb-10">
      <h2 className="text-sm font-medium uppercase tracking-wider text-gray-400 mb-5">
        Speakers
      </h2>
      <div className="flex flex-wrap gap-6">
        {speakers.map((speaker) => (
          <Link
            key={speaker.id}
            href={`/speakers/${speaker.id}`}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <Mic2 className="h-4 w-4 text-gray-500" />
            </div>
            <span className="text-sm text-gray-600 group-hover:text-black transition-colors">
              {speaker.fullName}
            </span>
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-50">
        <span className="text-sm text-gray-400">Add to Favorite</span>
        <Heart
          onClick={onToggleFavorite}
          className={`h-5 w-5 cursor-pointer transition-colors ${
            isFavorite ? "fill-black text-black" : "text-gray-300 hover:text-gray-500"
          }`}
        />
      </div>
    </div>
  );
}
