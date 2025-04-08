import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailSkeleton() {
  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      <div className="container mx-auto px-4 py-4">
        {/* Placeholder for a potential navigation or title */}
        <div className="hidden sm:block h-6 w-32 mb-6">
          <Skeleton className="h-full w-full rounded-md" />
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5">
          {/* Image Placeholder */}
          <div className="md:col-span-2 lg:col-span-2 p-4 border-r border-gray-200 flex justify-center items-center">
            <Skeleton className="aspect-square w-3/4 md:w-2/3 rounded-md" />
          </div>

          {/* Details Placeholder */}
          <div className="md:col-span-3 lg:col-span-3 p-6">
            <Skeleton className="h-8 w-3/4 mb-3" /> {/* Product Title */}
            <Skeleton className="h-4 w-1/2 mb-2" /> {/* Sub-title/category */}
            <div className="flex items-center mb-4">
              <Skeleton className="h-5 w-20 mr-2" /> {/* Rating stars */}
              <Skeleton className="h-4 w-12" /> {/* Rating count */}
            </div>
            <Skeleton className="h-6 w-32 mb-4" /> {/* Price */}
            <Skeleton className="h-20 w-full mb-6" /> {/* Description */}
            {/* Size Placeholder */}
            <div className="mb-4">
              <Skeleton className="h-4 w-20 mb-2" /> {/* Size label */}
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-10 w-10 rounded-md" />
                ))}
                {/* Add more skeletons for more potential sizes */}
              </div>
            </div>
            {/* Quantity Placeholder */}
            <div className="mb-6">
              <Skeleton className="h-4 w-24 mb-2" /> {/* Quantity label */}
              <div className="flex items-center">
                <Skeleton className="h-8 w-8 rounded-l-md" />
                <Skeleton className="h-8 w-10" />
                <Skeleton className="h-8 w-8 rounded-r-md" />
                <Skeleton className="h-4 w-24 ml-4" /> {/* Availability */}
              </div>
            </div>
            {/* Action Buttons Placeholder */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <Skeleton className="h-12 flex-1 rounded-md" />
              <Skeleton className="h-12 flex-1 rounded-md" />
            </div>
            {/* Delivery and Returns Placeholders */}
            <Skeleton className="h-16 w-full mb-3 rounded-md" />
            <Skeleton className="h-16 w-full rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
