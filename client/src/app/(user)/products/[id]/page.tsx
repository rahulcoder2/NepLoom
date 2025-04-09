import axios from "axios";
import Container from "@/components/shared/container";
import ProductDetailsImage from "./product-details.image";
import ProductDetailsInfo from "./product-details-info";
import ProductDetailsActionButton from "./product-action-button";
import ProductReturns from "./product-returns";
import ProductDelivery from "./product-delivery";
import { notFound } from "next/navigation";
import { ProductType } from "@/types/types";

const getProductById = async (id: string): Promise<ProductType | null> => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`
    );
    return data?.product || null;
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
};

// Define props type for ProductDetailPage
interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

const ProductDetailPage = async ({ params }: ProductDetailPageProps) => {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      <Container>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5">
            {/* Pass the correct type to the component */}
            <ProductDetailsImage product={product} />
            <div className="md:col-span-3 lg:col-span-3 p-6">
              <ProductDetailsInfo product={product} />
              <ProductDetailsActionButton product={product} />
              <ProductDelivery />
              <ProductReturns />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductDetailPage;
