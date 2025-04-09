import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Image Skeleton */}
          <div className="md:col-span-2">
            <Skeleton className="w-full h-[400px] rounded-md" />
          </div>

          {/* Info + Actions */}
          <div className="md:col-span-3 space-y-4">
            {/* Title */}
            <Skeleton className="h-6 w-3/4" />
            {/* Rating */}
            <Skeleton className="h-4 w-1/3" />
            {/* Price */}
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-4 w-20" />
            {/* Category */}
            <Skeleton className="h-4 w-32" />
            {/* Size & Quantity */}
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            {/* Buttons */}
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            {/* Delivery and Returns */}
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
