"use client";
import ProductDetailSkeleton from "@/components/(user)/skeleton/product-detail";
import Container from "@/components/shared/container";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  formatPriceNPR,
  formatDiscountPriceNPR,
  calculateDiscountPercentage,
  getRatingValue,
  renderRatingStars,
} from "@/lib/helper"; // Import renderRatingStars
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import ProductDelivery from "@/components/shared/product-delivery";
import ProductReturns from "@/components/shared/product-returns";

// Define TypeScript interface for product
interface ProductType {
  _id: string;
  name: string;
  description: string;
  price: number;
  discountPrice: number;
  stock: number;
  image: {
    url: string;
  };
  categoryName: string;
  ratings: number;
  size: string[];
}

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const ratingValue = getRatingValue(product?.ratings); // Get the rating value
  const ratingStars = renderRatingStars(product?.ratings); // Get the array of star icons
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product?.size?.[0]
  ); // Initialize with the first size if available
  const maxQuantity = product?.stock || 0;
  const isOutOfStock = maxQuantity <= 0;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`
        );
        setProduct(data?.product);
        // Update selectedSize and maxQuantity when product is fetched
        setSelectedSize(data?.product?.size?.[0]);
        setQuantity(1); // Reset quantity on product change
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [id]);

  const formattedPrice = product ? formatPriceNPR(product.price) : "";

  const formattedDiscountPrice = product?.discountPrice
    ? formatDiscountPriceNPR(product.discountPrice)
    : null;

  const discountPercentage = product?.discountPrice
    ? calculateDiscountPercentage(product.price, product.discountPrice)
    : null;

  const sizes = product?.size || [];

  const onSizeChange = (value: string) => {
    setSelectedSize(value);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < maxQuantity) {
      setQuantity((prev) => prev + 1);
    }
  };

  const onAddToCart = () => {
    // Implement your add to cart logic here, using product, quantity, and selectedSize
    if (product && !isOutOfStock) {
      console.log("Adding to cart:", {
        productId: product._id,
        quantity,
        selectedSize,
      });
      // You would likely dispatch an action to your Redux Toolkit store here
    }
  };

  const onBuyNow = () => {
    // Implement your buy now logic here, using product, quantity, and selectedSize
    if (product && !isOutOfStock) {
      console.log("Buying now:", {
        productId: product._id,
        quantity,
        selectedSize,
      });
      // You would likely navigate to a checkout page hereitems-center
    }
  };

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      <Container>
        <div>
          {product && (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5">
                {/* Product Image Section - Left Side */}
                <div className="md:col-span-2 lg:col-span-2 p-4 border-r border-gray-100">
                  {product.image?.url && (
                    <Image
                      src={product.image.url}
                      alt={product.name}
                      width={500}
                      height={500}
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                  )}
                </div>

                {/* Product Details Section - Right Side */}
                <div className="md:col-span-3 lg:col-span-3 p-6">
                  <h1 className="text-xl md:text-2xl font-medium text-gray-900 mb-2">
                    {product.name}
                  </h1>

                  <div className="flex items-center mb-4">
                    <div className="flex items-center">{ratingStars}</div>
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

                  <p className="text-gray-700 mb-6">{product.description}</p>

                  {sizes && sizes.length > 0 && (
                    <div className="mb-6">
                      <div className="flex justify-between mb-2">
                        <h3 className="text-sm font-medium text-gray-900">
                          Size
                        </h3>
                        <span className="text-sm text-blue-500">
                          Size Guide
                        </span>
                      </div>
                      <RadioGroup
                        value={selectedSize}
                        onValueChange={onSizeChange}
                        className="flex flex-wrap gap-2"
                      >
                        {sizes.map((size) => (
                          <div key={size} className="flex items-center">
                            <RadioGroupItem
                              value={size}
                              id={`size-${size}`}
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor={`size-${size}`}
                              className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white text-sm font-medium text-gray-900 peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50 peer-data-[state=checked]:text-blue-600 hover:bg-gray-50 cursor-pointer"
                            >
                              {size}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  )}

                  {/* Quantity */}
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">
                      Quantity
                    </h3>
                    <div className="flex items-center">
                      <button
                        onClick={decreaseQuantity}
                        disabled={quantity <= 1}
                        className="h-8 w-8 flex items-center justify-center border border-gray-300 rounded-l-md bg-gray-50 text-gray-600 disabled:opacity-50"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <div className="flex items-center justify-center h-8 w-10 border-y border-gray-300 text-center">
                        {quantity}
                      </div>
                      <button
                        onClick={increaseQuantity}
                        disabled={quantity >= maxQuantity}
                        className="h-8 w-8 flex items-center justify-center border border-gray-300 rounded-r-md bg-gray-50 text-gray-600 disabled:opacity-50"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                      <span className="ml-4 text-sm text-gray-500">
                        {maxQuantity > 0
                          ? `${maxQuantity} available`
                          : "Out of stock"}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col w-full sm:flex-row gap-3 mb-6">
                    <Button
                      className=" bg-orange-500 hover:bg-orange-600 text-white w-full"
                      size={"lg"}
                      disabled={isOutOfStock}
                      onClick={onAddToCart}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>

                    <Button
                      className=" bg-blue-500 hover:bg-blue-600 text-white w-full"
                      size={"lg"}
                      disabled={isOutOfStock}
                      onClick={onBuyNow}
                    >
                      Buy Now
                    </Button>
                  </div>

                  {/* Delivery Information */}
                  <ProductDelivery />

                  {/* Return Policy */}
                  <ProductReturns />
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default ProductDetailPage;
