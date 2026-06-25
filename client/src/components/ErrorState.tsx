"use client";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ message = "Something went wrong", onRetry }: ErrorStateProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center max-w-md px-4">
        <p className="text-gray-500 mb-4">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-black text-white rounded-full text-sm hover:bg-gray-800 transition-colors"
          >
            Try again
          </button>
        )}
        <div className="mt-4">
          <a href="/" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
            ← Back to home
          </a>
        </div>
      </div>
    </div>
  );
}

export default ErrorState;
