import CategorySection from "@/components/section/category-section";
import HeroCarousel from "@/components/section/hero-carousel";
import ProductSection from "@/components/section/product-section";
import Container from "@/components/shared/container";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <Container>
      {/* Main Promotional Carousels */}
      <div className="mt-6 mb-8">
        <HeroCarousel />
      </div>

      {/* Categories Section */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Categories</h2>
          <Link
            href="/categories"
            className="flex items-center gap-1 text-primary hover:underline"
          >
            Browse All <ArrowRight size={16} />
          </Link>
        </div>
        <CategorySection
          categories={[
            {
              _id: 1,
              name: "Electronics",
              icon: "/electronics.svg",
            },
            {
              _id: 2,
              name: "Clothing",
              icon: "/clothing.svg",
            },
            {
              _id: 3,
              name: "Furniture",
              icon: "/furniture.svg",
            },
            {
              _id: 4,
              name: "Books",
              icon: "/books.svg",
            },
            {
              _id: 5,
              name: "Sports",
              icon: "/sports.svg",
            },
            {
              _id: 6,
              name: "Beauty",
              icon: "/beauty.svg",
            },
            {
              _id: 7,
              name: "Grocery",
              icon: "/grocery.svg",
            },
            {
              _id: 8,
              name: "Automotive",
              icon: "/automotive.svg",
            },
          ]}
        />
      </div>
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Explore Product</h2>
          <Link
            href={"/products"}
            className="flex items-center gap-1 text-primary hover:underline"
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <ProductSection />
      </div>
    </Container>
  );
}
