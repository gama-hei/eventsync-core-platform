"use client";

import { UpvoteButton } from "@/components/UpvoteButton";
import { useFavorites } from "@/hooks/useFavorites";
import { API_BASE_URL } from "@/lib/constants";
import { formatDate, formatTime } from "@/lib/utils";
import {
  ArrowLeft,
  Calendar,
  Clock,
  DoorOpen,
  Mic2,
  Radio,
  Send,
  Users,
  Heart
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface Speaker {
  id: string;
  fullName: string;
}

interface Question {
  id: string;
  content: string;
  authorName: string;
  upvotes: number;
  createdAt: string;
  sessionId: string;
}

interface Session {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  roomId: string;
  roomName?: string;
  capacity: number;
  eventId: string;
  speakers?: Speaker[];
}

interface Room {
  id: string;
  name: string;
}

function isLive(startTime: string, endTime: string): boolean {
  const now = new Date();
  const start = new Date(startTime);
  const end = new Date(endTime);
  return now >= start && now <= end;
}

function MessageCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

export default function SessionPage() {
  const params = useParams();
  const sessionId = params.id as string;

  const [session, setSession] = useState<Session | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [roomName, setRoomName] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [newQuestion, setNewQuestion] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/sessions/${sessionId}`);
        if (!res.ok) throw new Error("Session not found");
        const data = await res.json();
        setSession(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load session");
      } finally {
        setLoading(false);
      }
    };
    fetchSession();
  }, [sessionId]);

  const fetchQuestions = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/sessions/${sessionId}/questions`);
      const data = await res.json();
      setQuestions(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load questions", err);
    }
  }, [sessionId]);

  useEffect(() => {
    if (session?.roomId) {
      const fetchRoom = async () => {
        try {
          const res = await fetch(`${API_BASE_URL}/rooms/${session.roomId}`);
          const room: Room = await res.json();
          setRoomName(room.name);
        } catch (err) {
          console.error("Failed to load room", err);
        }
      };
      fetchRoom();
    }
  }, [session]);

  useEffect(() => {
    if (session) {
      fetchQuestions();

      if (isLive(session.startTime, session.endTime) && autoRefresh) {
        const interval = setInterval(fetchQuestions, 5000);
        return () => clearInterval(interval);
      }
    }
  }, [session, fetchQuestions, autoRefresh]);

  const handleSubmitQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/sessions/${sessionId}/questions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: newQuestion,
          authorName: authorName.trim() || "Anonymous",
        }),
      });
      const newQ = await res.json();
      setQuestions((prev) => [newQ, ...prev]);
      setNewQuestion("");
    } catch (err) {
      console.error("Failed to post question", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpvoteSuccess = (newUpvotes: number, questionId: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === questionId ? { ...q, upvotes: newUpvotes } : q))
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">{error || "Session not found"}</p>
          <Link href="/" className="text-gray-600 hover:text-black mt-4 inline-block">
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  const live = isLive(session.startTime, session.endTime);
  const sortedQuestions = [...questions].sort((a, b) => b.upvotes - a.upvotes);

  return (
    <main className="max-w-4xl mx-auto px-6 py-16 font-sans">
      <div className="mb-10">
        <Link
          href={`/events/${session.eventId}`}
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-black transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to event
        </Link>
      </div>

      {live && (
        <div className="mb-6">
          <span className="inline-block text-xs font-medium text-black bg-gray-100 px-3 py-1 rounded-full uppercase tracking-wider">
            ● Live Now
          </span>
        </div>
      )}

      <div className="mb-10">
        <h1 className="text-5xl md:text-6xl font-serif font-light text-black mb-4 tracking-tight leading-[1.1]">
          {session.title}
        </h1>
        <p className="text-xl text-gray-500 font-light leading-relaxed">
          {session.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-6 text-sm text-gray-400 border-b border-gray-100 pb-8 mb-10">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(session.startTime)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>{formatTime(session.startTime)} — {formatTime(session.endTime)}</span>
        </div>
        <div className="flex items-center gap-2">
          <DoorOpen className="h-4 w-4" />
          <span>{roomName || "TBD"}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span>{session.capacity || "Unlimited"}</span>
        </div>
      </div>

      {session.speakers && session.speakers.length > 0 && (
        <div className="mb-12 border-b border-gray-100 pb-10">
          <h2 className="text-sm font-medium uppercase tracking-wider text-gray-400 mb-5">
            Speakers
          </h2>
          <div className="flex flex-wrap gap-6">
            {session.speakers.map((speaker) => (
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
              onClick={() => session && toggleFavorite(session)}
              className={`h-5 w-5 cursor-pointer transition-colors ${
                session && isFavorite(session.id)
                  ? "fill-black text-black"
                  : "text-gray-300 hover:text-gray-500"
              }`}
            />
          </div>
        </div>
      )}

      {live ? (
        <div className="border-t border-gray-100 pt-10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Radio className="h-4 w-4 text-black" />
              <h2 className="text-xl font-sans font-light text-black tracking-tight">
                Live Q&A
              </h2>
              <span className="text-sm text-gray-400">
                {sortedQuestions.length} questions
              </span>
            </div>
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className="text-xs text-gray-400 hover:text-black transition-colors"
            >
              {autoRefresh ? "Auto-refresh on" : "Auto-refresh off"}
            </button>
          </div>

          <form onSubmit={handleSubmitQuestion} className="mb-10">
            <textarea
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="Ask a question to the speaker..."
              rows={3}
              className="w-full px-0 py-3 border-b border-gray-200 focus:outline-none focus:border-black resize-none text-gray-700 placeholder-gray-300 transition-colors"
            />
            <div className="flex justify-between items-center mt-4">
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Your name (optional)"
                className="px-0 py-2 border-b border-gray-200 focus:outline-none focus:border-black text-sm text-gray-700 placeholder-gray-300 transition-colors"
              />
              <button
                type="submit"
                disabled={!newQuestion.trim() || submitting}
                className="px-6 py-2 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 disabled:opacity-50 transition-colors"
              >
                <Send className="h-4 w-4 inline mr-2" />
                {submitting ? "Sending..." : "Post question"}
              </button>
            </div>
          </form>

          <div className="space-y-6">
            {sortedQuestions.length === 0 ? (
              <div className="text-center py-16">
                <MessageCircle className="h-12 w-12 text-gray-200 mx-auto mb-3" />
                <p className="text-gray-500 font-light">No questions yet</p>
                <p className="text-sm text-gray-400 font-light">
                  Be the first to ask something!
                </p>
              </div>
            ) : (
              sortedQuestions.map((q, index) => (
                <div
                  key={q.id}
                  className={`pb-6 ${
                    index !== sortedQuestions.length - 1 ? "border-b border-gray-50" : ""
                  }`}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        {index === 0 && q.upvotes > 0 && (
                          <span className="text-[10px] font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                            Top
                          </span>
                        )}
                        <span className="text-sm font-medium text-gray-700">
                          {q.authorName || "Anonymous"}
                        </span>
                        <span className="text-xs text-gray-300">
                          {formatTime(q.createdAt)}
                        </span>
                      </div>
                      <p className="text-gray-800 leading-relaxed">{q.content}</p>
                    </div>
                    <UpvoteButton
                      questionId={q.id}
                      initialUpvotes={q.upvotes}
                      sessionId={sessionId}
                      onUpvoteSuccess={handleUpvoteSuccess}
                    />
                  </div>
                </div>
              ))
            )}
          </div>

          {sortedQuestions.length > 1 && (
            <div className="mt-6 text-center text-xs text-gray-300">
              Questions sorted by popularity (most upvoted first)
            </div>
          )}
        </div>
      ) : (
        <div className="border-t border-gray-100 pt-10">
          <div className="text-center py-16">
            <Clock className="h-12 w-12 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500 font-light">
              Q&A will be available when the session starts
            </p>
            <p className="text-sm text-gray-400 font-light mt-1">
              {formatDate(session.startTime)} at {formatTime(session.startTime)}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
