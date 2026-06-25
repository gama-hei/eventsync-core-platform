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
    <div className="mb-12 border-b border-gray-200 pb-10">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-600 mb-5">
        Speakers
      </h2>
      <div className="flex flex-wrap gap-4">
        {speakers.map((speaker) => (
          <Link
            key={speaker.id}
            href={`/speakers/${speaker.id}`}
            className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors group"
          >
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center group-hover:bg-gray-300 transition-colors">
              <Mic2 className="h-4 w-4 text-gray-700 group-hover:text-gray-900 transition-colors" />
            </div>
            <span className="text-sm font-medium text-gray-800 group-hover:text-black transition-colors">
              {speaker.fullName}
            </span>
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-200">
        <span className="text-sm font-medium text-gray-700">Add to Favorite</span>
        <Heart
          onClick={onToggleFavorite}
          className={`h-5 w-5 cursor-pointer transition-all hover:scale-110 ${
            isFavorite ? "fill-black text-black" : "text-gray-400 hover:text-gray-700"
          }`}
        />
      </div>
    </div>
  );
}
