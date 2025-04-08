import { JSX } from "react";
import { StarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export const formatPriceNPR = (price: number): string => {
  return new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: "NPR",
  }).format(price);
};

export const formatDiscountPriceNPR = (
  discountPrice?: number
): string | null => {
  if (discountPrice && discountPrice > 0) {
    return new Intl.NumberFormat("en-NP", {
      style: "currency",
      currency: "NPR",
    }).format(discountPrice);
  }
  return null;
};

export const calculateDiscountPercentage = (
  price: number,
  discountPrice?: number
): number | null => {
  return discountPrice && discountPrice > 0
    ? Math.round(((price - discountPrice) / price) * 100)
    : null;
};

export const renderRatingStars = (
  rating: number | undefined
): JSX.Element[] => {
  const normalizedRating = rating ?? 0;
  const stars = Array.from({ length: 5 }).map((_, index) => (
    <StarIcon
      key={index}
      size={14}
      className={cn(
        "fill-current",
        index < Math.floor(normalizedRating)
          ? "text-yellow-400"
          : index < normalizedRating
          ? "text-yellow-400/50"
          : "text-gray-300"
      )}
    />
  ));
  return stars;
};

export const getRatingValue = (ratings: number | undefined): number => {
  return ratings ?? 0;
};