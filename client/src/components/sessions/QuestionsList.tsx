import { UpvoteButton } from "@/components/sessions/UpvoteButton";
import { formatTime } from "@/lib/utils";
import { Question } from "@/types";
import { MessageCircle, User } from "lucide-react";

interface QuestionsListProps {
  questions: Question[];
  sessionId: string;
  onUpvote: (questionId: string, newUpvotes: number) => void;
}

export function QuestionsList({ questions, sessionId, onUpvote }: QuestionsListProps) {
  const sortedQuestions = [...questions].sort((a, b) => b.upvotes - a.upvotes);

  if (sortedQuestions.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageCircle className="h-8 w-8 text-gray-300" />
        </div>
        <p className="text-gray-600 font-medium">No questions yet</p>
        <p className="text-sm text-gray-400 mt-1">Be the first to ask something!</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {sortedQuestions.map((q, index) => (
        <div
          key={q.id}
          className={`pb-8 ${
            index !== sortedQuestions.length - 1 ? "border-b border-gray-100" : ""
          }`}
        >
          <div className="flex gap-4">
            <div className="shrink-0">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-gray-500" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                {index === 0 && q.upvotes > 5 && (
                  <span className="text-[10px] font-semibold text-white bg-black px-2 py-0.5 rounded-full">
                    ★ Top
                  </span>
                )}
                <span className="text-sm font-medium text-gray-700">
                  {q.authorName || "Anonymous"}
                </span>
                <span className="text-xs text-gray-400">· {formatTime(q.createdAt)}</span>
              </div>
              <p className="text-gray-800 leading-relaxed text-base">{q.content}</p>
            </div>
            <div className="shrink-0">
              <UpvoteButton
                questionId={q.id}
                initialUpvotes={q.upvotes}
                sessionId={sessionId}
                onUpvoteSuccess={onUpvote}
              />
            </div>
          </div>
        </div>
      ))}
      {sortedQuestions.length > 1 && (
        <div className="mt-2 text-center text-xs text-gray-400">
          Sorted by popularity — most upvoted first
        </div>
      )}
    </div>
  );
}
