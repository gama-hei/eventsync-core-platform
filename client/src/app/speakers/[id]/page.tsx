"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowLeft,
  Mic2,
  Calendar,
  MapPin,
  Clock,
  Globe,
  Mail,
  Award,
  Users,
} from "lucide-react";
import { useParams } from "next/navigation";
import { API_BASE_URL } from "@/lib/constants";
import Image from "next/image";
import { Speaker, Session } from "@/types";

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export default function SpeakerPage() {
  const params = useParams();
  const id = params.id;
  const [speaker, setSpeaker] = useState<Speaker | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Speaker ID récupéré:", id);
    if (id) {
      fetch(`${API_BASE_URL}/speakers/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Speaker not found");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Speaker data:", data);
          console.log("Sessions:", data.sessions);
          setSpeaker(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center py-20">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-500">Loading speaker details...</p>
        </div>
      </div>
    );
  }

  if (error || !speaker) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center py-20 bg-gray-50 rounded-2xl">
          <p className="text-gray-400 mb-4">
            {error || "Speaker not found"}
          </p>
          <Link
            href="/speakers"
            className="inline-block text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Back to Speakers
          </Link>
        </div>
      </div>
    );
  }

  const profileImageUrl = speaker.profilePicture || "/images/default-avatar.jpg";
  
  const sessions = speaker.sessions || [];

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-8">
        <Link
          href="/speakers"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-7 w-7" />
           <span className="text-2xl">Back to All Speakers</span>
        </Link>
      </div>

      <section className="relative overflow-hidden rounded-3xl bg-[#FBFBFB] border border-gray-100 p-8 md:p-12 mb-12">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0">
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden ring-4 ring-indigo-100">
              <Image
                src={profileImageUrl}
                alt={speaker.fullName}
                width={192}
                height={192}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex-1">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-px bg-indigo-600" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
                Speaker
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4 tracking-tight">
              {speaker.fullName}
            </h1>

            {speaker.bio && (
              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                {speaker.bio}
              </p>
            )}

            {speaker.externalLinks && speaker.externalLinks.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-6">
                {speaker.externalLinks.map((link, index) => {
                  if (link.includes("linkedin")) {
                    return (
                      <a
                        key={index}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-blue-50 rounded-full text-gray-700 hover:text-blue-600 transition-colors"
                      >
                        <span className="text-sm">LinkedIn</span>
                      </a>
                    );
                  } else if (link.includes("github")) {
                    return (
                      <a
                        key={index}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
                      >
                        <Globe className="h-4 w-4" />
                        <span className="text-sm">GitHub</span>
                      </a>
                    );
                  } else {
                    return (
                      <a
                        key={index}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
                      >
                        <Globe className="h-4 w-4" />
                        <span className="text-sm">Website</span>
                      </a>
                    );
                  }
                })}
              </div>
            )}

            <div className="flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Mic2 className="h-9 w-9" />
                <span className="text-xl">
                  {sessions.length} session{sessions.length > 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {sessions.length > 0 && (
        <section>
         <div className="mb-8 flex justify-center">
  <div className="inline-flex items-center gap-2 mb-4 flex-wrap justify-center">
    <span className="w-17 h-[9px] bg-indigo-600" />
    <span className="text-base sm:text-lg md:text-xl lg:text-2xl">
      Look the Sessions with
    </span>
    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-gray-900">
      {speaker.fullName}
    </h2>
    <span className="w-17 h-[9px] bg-indigo-600" />
  </div>
</div>

          <div className="space-y-6 ">
            {sessions.map((session) => (
              <article
                key={session.id}
                className="group border border-gray-100 rounded-2xl p-6  transition-all shadow-none hover:shadow-2xl hover:shadow-fill-back transition-shadow duration-300"
              >
                <Link href={`/sessions/${session.id}`}>
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-serif font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors mb-2">
                        {session.title}
                      </h3>

                      {session.description && (
                        <p className="text-gray-800 line-clamp-2 mb-4">
                          {session.description}
                        </p>
                      )}

                      <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(session.startTime)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4" />
                          <span>
                            {new Date(session.startTime).toLocaleTimeString(
                              "en-US",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}{" "}
                            -{" "}
                            {new Date(session.endTime).toLocaleTimeString(
                              "en-US",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-indigo-600 font-medium group-hover:gap-2 transition-all">
                      <span>View session</span>
                      <ArrowLeft className="h-4 w-4 rotate-180" />
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}

      {sessions.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-2xl">
          <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-400">
            No sessions scheduled for this speaker yet.
          </p>
        </div>
      )}
    </main>
  );
}