import { ArrowRight, Home, Globe, Mic2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { API_BASE_URL } from "@/lib/constants";
import { Speaker } from "@/types";

export const revalidate = 60;

async function getSpeakers(): Promise<Speaker[]> {
  const res = await fetch(`${API_BASE_URL}/speakers`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch speakers");
  return res.json();
}

function getSocialLinkType(url: string): 'twitter' | 'linkedin' | 'github' | 'website' {
  if (url.includes('twitter.com') || url.includes('x.com')) return 'twitter';
  if (url.includes('linkedin.com')) return 'linkedin';
  if (url.includes('github.com')) return 'github';
  return 'website';
}

function SocialIcon({ url }: { url: string }) {
  const type = getSocialLinkType(url);
  
  if (type === 'twitter') {
    return (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  }
  
  if (type === 'linkedin') {
    return (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    );
  }
  
  return <Globe className="h-4 w-4" />;
}

function getSocialName(url: string): string {
  const type = getSocialLinkType(url);
  if (type === 'twitter') return 'Twitter';
  if (type === 'linkedin') return 'LinkedIn';
  if (type === 'github') return 'GitHub';
  return 'Website';
}

function getSocialColor(url: string): string {
  const type = getSocialLinkType(url);
  if (type === 'twitter') return 'hover:text-sky-500';
  if (type === 'linkedin') return 'hover:text-blue-600';
  if (type === 'github') return 'hover:text-gray-700';
  return 'hover:text-gray-700';
}

export default async function SpeakersPage() {
  const speakers = await getSpeakers();

  return (
    <main className="max-w-4xl mx-auto px-6 py-12 ">

      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          <Home className="h-7 w-7" />
         <span className="text-2xl"> Back to Home </span>
        </Link>
      </div>

      <div className="mb-12">
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="w-8 h-px bg-indigo-600" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
            Intervenants
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4 tracking-tight">
          All Speakers
        </h1>
        <p className="text-gray-500 text-lg">
          {speakers.length} speaker{speakers.length > 1 ? "s" : ""} at this event
        </p>
      </div>

      {speakers.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl">
          <p className="text-gray-400 mb-4">No speakers available</p>
          <Link href="/" className="inline-block text-indigo-600 hover:text-indigo-700 font-medium ">
            Back to home
          </Link>
        </div>
      ) : (
        <div className="space-y-8 flex flex-wrap gap-10">
          {speakers.map((speaker) => {
            const profileImageUrl = speaker.profilePicture || '/images/default-avatar.jpg';
            
            return (
              <article key={speaker.id} className="group border-b rounded border-gray-100 pb-8 last:border-0 transition-all duration-300 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl">
                <div className="grid grid-col md:flex-row md:items-start gap-6">
                
                  <div className="mx-auto z-10 ">
                    <Link href={`/speakers/${speaker.id}`}>
                      <Image
                        src={profileImageUrl}
                        alt={speaker.fullName}
                        width={100}
                        height={100}
                        className="rounded-full object-cover w-20 h-20 ring-2 ring-gray-100 cursor-pointer"
                      />
                    </Link>
                  </div>

                  <div className="flex-1 min-w-0 bg-fill-back mt-[-4rem] pt-10 px-5 pb-5 border-1 border-fill-back rounded-xl ">
                    <Link href={`/speakers/${speaker.id}`}>
                      <h2 className="text-2xl font-serif font-semibold text-white group-hover:text-indigo-600 transition-colors mb-2 text-center">
                        {speaker.fullName}
                      </h2>
                    </Link>

                    {speaker.bio && (
                      <p className="text-gray-700 leading-relaxed line-clamp-2 mb-4 w-48 group-hover:text-white">
                        {speaker.bio}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center gap-4 text-sm text-white group-hover:text-gray-700">

                      <div className="flex items-center gap-1.5">
                        <Mic2 className="h-4 w-4" />
                        <span>
                          {speaker.sessions?.length || 0} session
                          {(speaker.sessions?.length || 0) > 1 ? "s" : ""}
                        </span>
                      </div>

                      {speaker.externalLinks && speaker.externalLinks.length > 0 && (
                        <>
                          {speaker.externalLinks.map((link, index) => (
                            <a
                              key={index}
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`flex items-center gap-1.5 ${getSocialColor(link)} transition-colors`}
                            >
                              <SocialIcon url={link} />
                              <span>{getSocialName(link)}</span>
                            </a>
                          ))}
                        </>
                      )}

                    </div>

                    <Link href={`/speakers/${speaker.id}`}>
                      <div className="flex items-center gap-1 text-white font-medium mt-4 group-hover:gap-2 transition-all group-hover:text-indigo-600">
                        <span >View more</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  </div>

                </div>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}