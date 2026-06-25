"use client";

import { useParams } from "next/navigation";
import { Radio } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { useSession } from "@/hooks/useSession";
import { useQuestions } from "@/hooks/useQuestions";
import { SessionHeader } from "@/components/sessions/SessionHeader";
import { SessionInfo } from "@/components/sessions/SessionInfo";
import { SpeakersList } from "@/components/sessions/SpeakersList";
import { QuestionForm } from "@/components/sessions/QuestionForm";
import { QuestionsList } from "@/components/sessions/QuestionsList";
import { QnaPlaceholder } from "@/components/sessions/QnaPlaceholder";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ErrorState } from "@/components/ErrorState";
import { isLive } from "@/lib/utils";

export default function SessionPage() {
  const params = useParams();
  const sessionId = params.id as string;

  const { session, loading, error } = useSession(sessionId);
  const { isFavorite, toggleFavorite } = useFavorites();
  const {
    questions,
    postQuestion,
    handleUpvote,
    autoRefresh,
    setAutoRefresh
  } = useQuestions(sessionId, session ? isLive(session.startTime, session.endTime) : false);

  if (loading) return <LoadingSpinner />;
  if (error || !session) return <ErrorState message={error || "Session not found"} />;

  const live = isLive(session.startTime, session.endTime);

  return (
    <main className="max-w-4xl mx-auto px-6 py-16 font-sans">
      <SessionHeader eventId={session.eventId} />

      {live && (
        <div className="mb-6">
          <span className="inline-block text-xs font-bold text-white bg-black px-3 py-1 rounded-full uppercase tracking-wider">
            ● Live Now
          </span>
        </div>
      )}

      <h1 className="text-5xl md:text-6xl font-serif font-bold text-black mb-4 tracking-tight leading-[1.1]">
        {session.title}
      </h1>
      <p className="text-xl text-gray-700 font-normal leading-relaxed mb-10">
        {session.description}
      </p>

      <SessionInfo
        startTime={session.startTime}
        endTime={session.endTime}
        roomName={session.roomName || "TBD"}
        capacity={session.capacity}
      />

      <SpeakersList
        speakers={session.speakers || []}
        isFavorite={isFavorite(session.id)}
        onToggleFavorite={() => toggleFavorite(session)}
      />

      {live ? (
        <div className="border-t border-gray-200 pt-10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Radio className="h-5 w-5 text-black" />
              <h2 className="text-xl font-sans font-bold text-black tracking-tight">
                Live Q&A
              </h2>
              <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-0.5 rounded-full">
                {questions.length} questions
              </span>
            </div>
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className="text-xs font-medium text-gray-500 hover:text-black transition-colors cursor-pointer"
            >
              {autoRefresh ? "Auto-refresh on" : "Auto-refresh off"}
            </button>
          </div>

          <QuestionForm onSubmit={postQuestion} />
          <QuestionsList
            questions={questions}
            sessionId={sessionId}
            onUpvote={handleUpvote}
          />
        </div>
      ) : (
        <QnaPlaceholder startTime={session.startTime} />
      )}
    </main>
  );
}
