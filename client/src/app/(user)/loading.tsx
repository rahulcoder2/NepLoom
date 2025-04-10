import { Skeleton } from "@/components/ui/skeleton";
import Container from "@/components/shared/container";
import CategorySkeleton from "@/components/(user)/skeletons/category-skeleton";
import ProductSkeleton from "@/components/(user)/skeletons/product-skeleton";

export default function HomeLoading() {
  return (
    <Container>
      {/* Hero Skeleton */}
      <div className="mt-6 mb-8">
        <Skeleton className="w-full h-[200px] sm:h-[300px] rounded-xl" />
      </div>

      {/* Categories Skeleton */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Categories</h2>
        </div>
        <CategorySkeleton />
      </div>

      {/* Products Skeleton */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Explore Product</h2>
          <Skeleton className="h-5 w-20" />
        </div>
        <ProductSkeleton />
      </div>
    </Container>
  );
}
