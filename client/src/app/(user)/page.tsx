import CategorySection from "@/components/section/category-section";
import FlashSaleSection from "@/components/section/flash-sale-section";
import HeroCarousel from "@/components/section/hero-carousel";
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

      {/* flash sale */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Flash Sale</h2>
          <Link
            href="/flash-sale"
            className="flex items-center gap-1 text-primary hover:underline"
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <FlashSaleSection />
      </div>
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Categories</h2>
          <Link
            href="/categories"
            className="flex items-center gap-1 text-[#FF5722] hover:underline"
          >
            Browse All <ArrowRight size={16} />
          </Link>
        </div>
        <CategorySection categories={[
  {
    id: 1,
    name: "Electronics",
    slug: "electronics",
    icon: "/electronics.svg",
    productCount: 120,
  },
  {
    id: 2,
    name: "Clothing",
    slug: "clothing",
    icon: "/clothing.svg",
    productCount: 120,
  },
  {
    id: 3,
    name: "Furniture",
    slug: "furniture",
    icon: "/furniture.svg",
    productCount: 120,
  },
  {
    id: 4,
    name: "Books",
    slug: "books",
    icon: "/books.svg",
    productCount: 120,
  },
  {
    id: 5,
    name: "Sports",
    slug: "sports",
    icon: "/sports.svg",
    productCount: 120,
  },
  {
    id: 6,
    name: "Beauty",
    slug: "beauty",
    icon: "/beauty.svg",
    productCount: 120,
  },
  {
    id: 7,
    name: "Grocery",
    slug: "grocery",
    icon: "/grocery.svg",
    productCount: 120,
  },
  {
    id: 8,
    name: "Automotive",
    slug: "automotive",
    icon: "/automotive.svg",
    productCount: 120,
  },
]} />
      </div>
    </Container>
  );
}
