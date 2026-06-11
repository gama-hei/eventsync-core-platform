"use client";

import { useState, useEffect } from "react";
import { ThumbsUp } from "lucide-react";
import { API_BASE_URL } from "@/lib/constants";

interface UpvoteButtonProps {
  questionId: string;
  initialUpvotes: number;
  sessionId: string;
  onUpvoteSuccess?: (newUpvotes: number, questionId: string) => void;
}

const STORAGE_KEY = "event_upvoted_questions";

export function UpvoteButton({
  questionId,
  initialUpvotes,
  sessionId,
  onUpvoteSuccess
}: UpvoteButtonProps) {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const upvotedQuestions = JSON.parse(stored);
      setHasUpvoted(upvotedQuestions.includes(questionId));
    }
  }, [questionId]);

  const handleUpvote = async () => {
    if (hasUpvoted || isLoading) return;

    setIsLoading(true);

    const newUpvotesCount = upvotes + 1;
    setUpvotes(newUpvotesCount);
    setHasUpvoted(true);

    const stored = localStorage.getItem(STORAGE_KEY);
    const upvotedQuestions = stored ? JSON.parse(stored) : [];
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...upvotedQuestions, questionId]));

    try {
      const response = await fetch(`${API_BASE_URL}/questions/${questionId}/upvote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        setUpvotes(upvotes);
        setHasUpvoted(false);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(upvotedQuestions));
        throw new Error("Failed to upvote");
      }

      const updated = await response.json();
      setUpvotes(updated.upvotes);

      if (onUpvoteSuccess) {
        onUpvoteSuccess(updated.upvotes, questionId);
      }
    } catch (error) {
      console.error("Error upvoting:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleUpvote}
      disabled={hasUpvoted || isLoading}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200 ${
        hasUpvoted
          ? "bg-indigo-100 text-indigo-700 cursor-default"
          : "bg-white text-gray-600 hover:bg-gray-100 active:scale-95"
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      <ThumbsUp className={`h-3.5 w-3.5 ${hasUpvoted ? "fill-indigo-600 text-indigo-600" : ""}`} />
      <span className="text-sm font-medium">{upvotes}</span>
    </button>
  );
}