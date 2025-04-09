"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ProductType } from "@/types/types";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

// Define props interface for ProductDetailsActionButton
interface ProductDetailsActionButtonProps {
  product: ProductType;
}

const ProductDetailsActionButton = ({
  product,
}: ProductDetailsActionButtonProps) => {
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.size?.[0]
  );
  const [quantity, setQuantity] = useState(1);
  const maxQuantity = product.stock;
  const isOutOfStock = maxQuantity <= 0;

  const sizes = product.size || [];

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
    if (product && !isOutOfStock) {
      console.log("Adding to cart:", {
        productId: product._id,
        quantity,
        selectedSize,
      });
    }
  };

  const onBuyNow = () => {
    if (product && !isOutOfStock) {
      console.log("Buying now:", {
        productId: product._id,
        quantity,
        selectedSize,
      });
    }
  };

  return (
    <>
      {sizes.length > 0 && (
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-900">Size</h3>
            <span className="text-sm text-blue-500">Size Guide</span>
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
        <h3 className="text-sm font-medium text-gray-900 mb-2">Quantity</h3>
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
            {maxQuantity > 0 ? `${maxQuantity} available` : "Out of stock"}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <Button
          className="bg-primary/90 hover:bg-primary text-white"
          size="lg"
          disabled={isOutOfStock}
          onClick={onAddToCart}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>

        <Button
          className="bg-blue-500 hover:bg-blue-600 text-white"
          size="lg"
          disabled={isOutOfStock}
          onClick={onBuyNow}
        >
          Buy Now
        </Button>
      </div>
    </>
  );
};

export default ProductDetailsActionButton;
