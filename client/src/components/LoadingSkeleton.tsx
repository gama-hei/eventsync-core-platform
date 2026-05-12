"use client";

export function LoadingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="relative overflow-hidden rounded-3xl bg-gray-100 border border-gray-100 p-8 md:p-20 mb-20">
          <div className="max-w-2xl">
            <div className="h-4 w-32 bg-gray-200 rounded mb-8" />
            <div className="h-12 w-3/4 bg-gray-200 rounded mb-8" />
            <div className="h-20 w-full bg-gray-200 rounded mb-10" />
            <div className="flex gap-8 mb-12">
              <div className="h-5 w-32 bg-gray-200 rounded" />
              <div className="h-5 w-32 bg-gray-200 rounded" />
            </div>
            <div className="h-12 w-40 bg-gray-200 rounded-full" />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-4 mb-10 border-b border-gray-100 pb-4">
              <div className="h-7 w-32 bg-gray-200 rounded" />
              <div className="h-5 w-16 bg-gray-200 rounded" />
            </div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="mb-12">
                <div className="h-4 w-48 bg-gray-200 rounded mb-3" />
                <div className="h-7 w-3/4 bg-gray-200 rounded mb-3" />
                <div className="h-16 w-full bg-gray-200 rounded mb-6" />
                <div className="flex justify-between">
                  <div className="h-8 w-32 bg-gray-200 rounded" />
                  <div className="h-5 w-5 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-12">
              <div className="pb-8 border-b border-gray-100">
                <div className="h-4 w-32 bg-gray-200 rounded mb-6" />
                <div className="h-16 w-full bg-gray-200 rounded mb-6" />
                <div className="h-4 w-24 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
