import CategoryGrid from "@/components/card/category-grid";
import HeroCarousel from "@/components/carousel/hero-carousel";
import Container from "@/components/shared/container";


export default function HomePage() {
  return (
    <Container>
      {/* Main Promotional Carousels */}
      <div className="mt-6 mb-8">
        <HeroCarousel />
      </div>
      {/* Category Grid */}
      <CategoryGrid />
    </Container>
  );
}
