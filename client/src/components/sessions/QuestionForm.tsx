
import { useState } from "react";
import { Send } from "lucide-react";

interface QuestionFormProps {
  onSubmit: (content: string, authorName: string) => Promise<void>;
}

export function QuestionForm({ onSubmit }: QuestionFormProps) {
  const [content, setContent] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setSubmitting(true);
    try {
      await onSubmit(content, authorName);
      setContent("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-10">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
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
          disabled={!content.trim() || submitting}
          className="px-6 py-2 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 disabled:opacity-50 transition-colors"
        >
          <Send className="h-4 w-4 inline mr-2" />
          {submitting ? "Sending..." : "Post question"}
        </button>
      </div>
    </form>
  );
}
