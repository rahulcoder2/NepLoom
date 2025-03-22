import Image from "next/image";
import Link from "next/link";
import { StarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    price: number;
    mainImage?: {
      url?: string;
    };
    ratings?: number;
    stock?: number;
  };
  className?: string;
  originalPrice?: number;
}

export default function ProductCard({
  product,
  className,
  originalPrice,
}: ProductCardProps) {
  // Format price to 2 decimal places
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price);

  // Format original price if provided
  const formattedOriginalPrice = originalPrice
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(originalPrice)
    : null;

  // Calculate discount percentage if original price is provided
  const discountPercentage = originalPrice
    ? Math.round(((originalPrice - product.price) / originalPrice) * 100)
    : null;

  // Generate stars based on rating (default to 0 if undefined)
  const rating = product.ratings ?? 0;
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <StarIcon
        key={index}
        size={14}
        className={cn(
          "fill-current",
          index < Math.floor(rating)
            ? "text-yellow-400"
            : index < rating
            ? "text-yellow-400/50"
            : "text-gray-300"
        )}
      />
    ));
  };

  // Check if product is in stock (default to 0 if undefined)
  const inStock = (product.stock ?? 0) > 0;

  // Get image URL with fallback
  const imageUrl =
    product.mainImage?.url || "/placeholder.svg?height=300&width=300";

  return (
    <Link
      href={`/products/${product._id}`}
      className={cn(
        "group flex h-full flex-col rounded-md border border-gray-200 bg-white p-3 transition-all hover:shadow-md",
        className
      )}
    >
      <div className="relative mb-3 aspect-square overflow-hidden rounded-md bg-gray-100">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
          className="object-cover transition-transform group-hover:scale-105"
        />
        {!inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-black">
              Out of Stock
            </span>
          </div>
        )}
        {discountPercentage && (
          <div className="absolute left-2 top-2 rounded-full bg-[#FF5722] px-2 py-1 text-xs font-bold text-white">
            -{discountPercentage}%
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col">
        <h3 className="mb-1 line-clamp-2 text-sm font-medium group-hover:text-[#FF5722]">
          {product.name}
        </h3>

        <div className="mb-2 flex items-center gap-1">
          <div className="flex items-center">{renderStars(rating)}</div>
          <span className="text-xs text-gray-500">({rating.toFixed(1)})</span>
        </div>

        <div className="mt-auto">
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold text-[#FF5722]">
              {formattedPrice}
            </span>
            {formattedOriginalPrice && (
              <span className="text-xs text-gray-400 line-through">
                {formattedOriginalPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
