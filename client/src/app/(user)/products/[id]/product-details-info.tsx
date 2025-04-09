import {
  formatPriceNPR,
  formatDiscountPriceNPR,
  calculateDiscountPercentage,
  getRatingValue,
  renderRatingStars,
} from "@/lib/helper";
import { ProductType } from "@/types/types";

// Define the props interface for ProductDetailsInfo
interface ProductDetailsInfoProps {
  product: ProductType;
}

const ProductDetailsInfo = ({ product }: ProductDetailsInfoProps) => {
  const formattedPrice = formatPriceNPR(product.price);
  const formattedDiscountPrice = formatDiscountPriceNPR(product.discountPrice);
  const discountPercentage = calculateDiscountPercentage(
    product.price,
    product.discountPrice
  );
  const ratingValue = getRatingValue(product.ratings);
  const stars = renderRatingStars(ratingValue);

  return (
    <>
      <h1 className="text-xl md:text-2xl font-medium text-gray-900 mb-2">
        {product.name}
      </h1>

      <div className="flex items-center mb-4">
        <div className="flex items-center">{stars}</div>
        <span className="ml-2 text-sm text-gray-500">
          {ratingValue > 0
            ? `(${ratingValue.toFixed(1)} ratings)`
            : "(No ratings yet)"}
        </span>
      </div>

      <div className="flex flex-col mb-4">
        <span className="text-2xl font-bold text-red-500">
          {formattedDiscountPrice || formattedPrice}
        </span>
        {formattedDiscountPrice && (
          <div className="flex items-center">
            <span className="ml-2 text-gray-500 line-through">
              {formattedPrice}
            </span>
            <span className="ml-2 text-sm font-medium text-green-600">
              {discountPercentage}% off
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center mb-4">
        <span className="text-sm text-gray-500">
          Category: {product.categoryName}
        </span>
      </div>
    </>
  );
};

export default ProductDetailsInfo;
