
import { UpvoteButton } from "@/components/sessions/UpvoteButton";
import { formatTime } from "@/lib/utils";
import { Question } from "@/types";

interface QuestionsListProps {
  questions: Question[];
  sessionId: string;
  onUpvote: (questionId: string, newUpvotes: number) => void;
}

function MessageCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

export function QuestionsList({ questions, sessionId, onUpvote }: QuestionsListProps) {
  const sortedQuestions = [...questions].sort((a, b) => b.upvotes - a.upvotes);

  if (sortedQuestions.length === 0) {
    return (
      <div className="text-center py-16">
        <MessageCircle className="h-12 w-12 text-gray-200 mx-auto mb-3" />
        <p className="text-gray-500 font-light">No questions yet</p>
        <p className="text-sm text-gray-400 font-light">Be the first to ask something!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {sortedQuestions.map((q, index) => (
        <div
          key={q.id}
          className={`pb-6 ${index !== sortedQuestions.length - 1 ? "border-b border-gray-50" : ""}`}
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
                <span className="text-xs text-gray-300">{formatTime(q.createdAt)}</span>
              </div>
              <p className="text-gray-800 leading-relaxed">{q.content}</p>
            </div>
            <UpvoteButton
              questionId={q.id}
              initialUpvotes={q.upvotes}
              sessionId={sessionId}
              onUpvoteSuccess={onUpvote}
            />
          </div>
        </div>
      ))}
      {sortedQuestions.length > 1 && (
        <div className="mt-6 text-center text-xs text-gray-300">
          Questions sorted by popularity (most upvoted first)
        </div>
      )}
    </div>
  );
}
