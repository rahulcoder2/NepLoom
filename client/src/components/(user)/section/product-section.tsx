// src/components/product-section.tsx
import ProductCard from "@/components/shared/product-card";
import axios from "axios";
import { Product } from "@/types/types"; // Import Product type

async function getProducts(): Promise<Product[]> {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/products`
  );
  return data?.products?.products || [];
}

export default async function ProductSection() {
  const products = await getProducts();

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
      {products.map((product) => (
        <ProductCard product={product} key={product._id} />
      ))}
    </div>
  );
}
