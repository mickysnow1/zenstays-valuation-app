export const ResultSkeleton = () => (
  <div className="space-y-8 animate-pulse">
    <div className="p-6 bg-gray-100 rounded-xl">
      <div className="h-4 bg-gray-200 rounded w-32 mb-3" />
      <div className="h-10 bg-gray-200 rounded w-64" />
      <div className="h-4 bg-gray-200 rounded w-48 mt-4" />
      <div className="h-6 bg-gray-200 rounded w-28 mt-4" />
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="p-4 rounded-lg bg-gray-100">
          <div className="h-3 bg-gray-200 rounded w-20 mb-2" />
          <div className="h-6 bg-gray-200 rounded w-16" />
        </div>
      ))}
    </div>
  </div>
);
