"use client";

export function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <p className="text-red-500 mb-4">Failed to load data</p>
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-black text-white rounded-full text-sm"
        >
          Retry
        </button>
      </div>
    </div>
  );
}
