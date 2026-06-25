import { useState, useEffect, useCallback } from "react";
import { API_BASE_URL } from "@/lib/constants";
import { Question } from "@/types";

export function useQuestions(sessionId: string, isLive: boolean) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [autoRefresh, setAutoRefresh] = useState(true);

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
    fetchQuestions();

    if (isLive && autoRefresh) {
      const interval = setInterval(fetchQuestions, 5000);
      return () => clearInterval(interval);
    }
  }, [fetchQuestions, isLive, autoRefresh]);

  const postQuestion = async (content: string, authorName: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/sessions/${sessionId}/questions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          authorName: authorName.trim() || "Anonymous",
        }),
      });
      const newQ = await res.json();
      setQuestions((prev) => [newQ, ...prev]);
      return newQ;
    } catch (err) {
      console.error("Failed to post question", err);
      throw err;
    }
  };

  const handleUpvote = (questionId: string, newUpvotes: number) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === questionId ? { ...q, upvotes: newUpvotes } : q))
    );
  };

  return {
    questions,
    setQuestions,
    postQuestion,
    handleUpvote,
    autoRefresh,
    setAutoRefresh
  };
}
