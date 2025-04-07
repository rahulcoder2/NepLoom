// app/components/ProductCard.tsx

import Image from "next/image";
import Link from "next/link";
import { StarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    price: number;
    discountPrice?: number;
    image: { url: string };
    ratings?: number;
  };
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const formattedPrice = new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: "NPR",
  }).format(product.price);

  const formattedDiscountPrice =
    product.discountPrice && product.discountPrice > 0
      ? new Intl.NumberFormat("en-NP", {
          style: "currency",
          currency: "NPR",
        }).format(product.discountPrice)
      : null;

  const discountPercentage =
    product.discountPrice && product.discountPrice > 0
      ? Math.round(
          ((product.price - product.discountPrice) / product.price) * 100
        )
      : null;

  const rating = product.ratings ?? 0;

  const stars = Array.from({ length: 5 }).map((_, index) => (
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

  return (
    <Link
      href={`/products/${product._id}`}
      className={cn(
        "group flex h-full flex-col rounded-md border border-gray-200 bg-white p-2 sm:p-3 transition-all hover:shadow-md", // Added sm:p-3 for larger padding on small screens and up
        className
      )}
    >
      <div className="relative mb-2 sm:mb-3 aspect-square overflow-hidden rounded-md bg-gray-100">
        <Image
          src={product.image.url}
          alt={`Product: ${product.name}`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
          className="object-cover transition-transform group-hover:scale-105"
        />
        {discountPercentage && (
          <div className="absolute right-2 top-2 rounded-full bg-primary px-2 py-1 text-xs font-bold text-white">
            -{discountPercentage}%
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col mt-1">
        <h3 className="mb-1 line-clamp-2 text-sm font-medium group-hover:text-primary">
          {product.name}
        </h3>
        {typeof product.ratings === "number" && product.ratings > 0 && (
          <div className="mb-2 flex items-center gap-1">
            <div className="flex items-center">{stars}</div>
            <span className="text-xs text-gray-500">({rating.toFixed(1)})</span>
          </div>
        )}
        <div className="mt-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2">
            <span className="text-base font-semibold text-primary">
              {formattedDiscountPrice || formattedPrice}
            </span>
            {formattedDiscountPrice && (
              <span className="text-xs text-gray-400 line-through">
                {formattedPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
