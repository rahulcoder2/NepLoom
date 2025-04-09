import { ProductType } from "@/types/types";
import Image from "next/image";

// Define props interface for ProductDetailsImage
interface ProductDetailsImageProps {
  product: ProductType;
}

const ProductDetailsImage = ({ product }: ProductDetailsImageProps) => {
  return (
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
  );
};

export default ProductDetailsImage;
