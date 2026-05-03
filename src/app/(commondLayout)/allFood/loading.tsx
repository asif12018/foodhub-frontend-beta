import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500">
      <div className="flex justify-center mb-6">
        <Skeleton className="h-10 w-48 rounded-md" />
      </div>

      {/* Filters Skeleton */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center my-6">
        <div className="w-full md:w-1/3">
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <div className="w-full md:w-48">
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>

      {/* Category Pills Skeleton */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-10 w-24 rounded-full" />
        ))}
      </div>

      <div className="flex justify-center mb-10">
        <div className="flex gap-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-6 w-20 rounded-md" />
          ))}
        </div>
      </div>

      {/* Product Cards Skeleton */}
      <div className="grid grid-cols-1 justify-center items-center md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex flex-col rounded-xl border bg-card text-card-foreground shadow-sm w-full overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <div className="p-6">
              <Skeleton className="h-6 w-3/4 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3 mb-4" />
              <div className="flex justify-between items-center mt-6">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-10 w-28 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
