"use client";

import { UpvoteButton } from "@/components/UpvoteButton";
import { useFavorites } from "@/hooks/useFavorites";
import { API_BASE_URL } from "@/lib/constants";
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

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(dateString: string): string {
  return new Date(dateString).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
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
  const {isFavorite, toggleFavorite} = useFavorites();
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
      const res = await fetch(
        `${API_BASE_URL}/sessions/${sessionId}/questions`,
      );
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
      const res = await fetch(
        `${API_BASE_URL}/sessions/${sessionId}/questions`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: newQuestion,
            authorName: authorName.trim() || "Anonymous",
          }),
        },
      );
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
      prev.map((q) =>
        q.id === questionId ? { ...q, upvotes: newUpvotes } : q,
      ),
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
          <Link
            href="/"
            className="text-indigo-600 hover:underline mt-4 inline-block"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  const live = isLive(session.startTime, session.endTime);

  const sortedQuestions = [...questions].sort((a, b) => b.upvotes - a.upvotes);

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-8">
        <Link
          href={`/events/${session.eventId}`}
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to event
        </Link>
      </div>
      {live && (
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-50 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
            </span>
            <span className="text-xs font-semibold text-red-600 uppercase tracking-wide">
              LIVE NOW
            </span>
          </div>
        </div>
      )}
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-black mb-4 tracking-tight">
          {session.title}
        </h1>
        <p className="text-xl text-gray-500 leading-relaxed">
          {session.description}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-gray-50 rounded-2xl mb-10">
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-gray-400" />
          <div>
            <p className="text-xs text-gray-400 uppercase">Date</p>
            <p className="text-sm font-medium text-gray-900">
              {formatDate(session.startTime)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Clock className="h-5 w-5 text-gray-400" />
          <div>
            <p className="text-xs text-gray-400 uppercase">Time</p>
            <p className="text-sm font-medium text-gray-900">
              {formatTime(session.startTime)} — {formatTime(session.endTime)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <DoorOpen className="h-5 w-5 text-gray-400" />
          <div>
            <p className="text-xs text-gray-400 uppercase">Room</p>
            <p className="text-sm font-medium text-gray-900">
              {roomName || "TBD"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Users className="h-5 w-5 text-gray-400" />
          <div>
            <p className="text-xs text-gray-400 uppercase">Capacity</p>
            <p className="text-sm font-medium text-gray-900">
              {session.capacity || "Unlimited"}
            </p>
          </div>
        </div>
      </div>
      {session.speakers && session.speakers.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Mic2 className="h-5 w-5 text-indigo-600" />
            <h2 className="text-xl font-semibold text-gray-900">Speakers</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {session.speakers.map((speaker) => (
              <Link
                key={speaker.id}
                href={`/speakers/${speaker.id}`}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
              >
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <Mic2 className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {speaker.fullName}
                  </h3>
                </div>
              </Link>
            ))}
            
          </div>
          <div className="inline-flex gap-2 mt-auto pt-5"> <p className="text-xl black">Add to Favorite</p>          <Heart
onClick={() => session && toggleFavorite(session)}
className={`h-6 w-6 cursor-pointer transition-colors ${
session && isFavorite(session.id)
? "fill-red-500 text-red-500"
: "text-gray-400"
}`}
/></div>

        </div>
        
      )}
      {live ? (
        <div className="border-t border-gray-100 pt-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Radio className="h-5 w-5 text-red-500 animate-pulse" />
              <h2 className="text-xl font-semibold text-gray-900">Live Q&A</h2>
              <span className="text-sm text-gray-400">
                {sortedQuestions.length} questions
              </span>
            </div>
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              {autoRefresh ? "Auto-refresh ON" : "Auto-refresh OFF"}
            </button>
          </div>

          <form onSubmit={handleSubmitQuestion} className="mb-8">
            <textarea
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="Ask a question to the speaker..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 resize-none"
            />
            <div className="flex justify-between items-center mt-3">
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Your name (optional)"
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-400 text-sm"
              />
              <button
                type="submit"
                disabled={!newQuestion.trim() || submitting}
                className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
              >
                <Send className="h-4 w-4" />
                {submitting ? "Sending..." : "Post question"}
              </button>
            </div>
          </form>

          <div className="space-y-4">
            {sortedQuestions.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-xl">
                <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">No questions yet</p>
                <p className="text-sm text-gray-400">
                  Be the first to ask something!
                </p>
              </div>
            ) : (
              sortedQuestions.map((q, index) => (
                <div
                  key={q.id}
                  className={`bg-gray-50 rounded-xl p-5 transition-all ${
                    index === 0 && q.upvotes > 0
                      ? "border-l-4 border-indigo-500"
                      : ""
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {index === 0 && q.upvotes > 0 && (
                          <span className="text-xs font-bold text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-full">
                            ★ Top
                          </span>
                        )}
                        <span className="font-medium text-gray-900">
                          {q.authorName || "Anonymous"}
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(q.createdAt).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-gray-700">{q.content}</p>
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
            <div className="mt-4 text-center text-xs text-gray-400">
              Questions sorted by popularity (most upvoted first)
            </div>
          )}
        </div>
      ) : (
        <div className="border-t border-gray-100 pt-10">
          <div className="text-center py-16 bg-gray-50 rounded-xl">
            <Clock className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">
              Q&A will be available when the session starts
            </p>
            <p className="text-sm text-gray-400 mt-1">
              {formatDate(session.startTime)} at {formatTime(session.startTime)}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}