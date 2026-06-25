export function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-5">
        <div
          className="w-12 h-12 rounded-full border-[3px] border-gray-200 border-t-gray-900"
          style={{ animation: "spin 0.8s cubic-bezier(0.6, 0.2, 0.4, 0.8) infinite" }}
        />
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400 tracking-wide">Loading</span>
          <div className="flex gap-1 items-center">
            {[0, 150, 300].map((delay) => (
              <span
                key={delay}
                className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                style={{ animation: `bounce 1.2s ease-in-out ${delay}ms infinite` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
