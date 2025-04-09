// CategorySection.tsx
import CategoryCard from "@/components/shared/category-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import axios from "axios";

export interface Category {
  _id: string;
  name: string;
  image: {
    url: string;
  };
}

export default async function CategorySection() {
  let categories: Category[] = [];

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/categories`
    );
    categories = response.data.categories.categories;
  } catch (error) {
    console.error("Failed to fetch categories", error);
  }

  return (
    <div className="mb-8">
      {/* Mobile carousel view */}
      <div className="block md:hidden">
        <Carousel opts={{ dragFree: true }} className="w-full">
          <CarouselContent className="-ml-2">
            {categories.map((category) => (
              <CarouselItem key={category._id} className="pl-2 basis-1/3 py-2 ">
                <CategoryCard category={category} className="border" />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Desktop grid view */}
      <div className="hidden md:grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 py-2 overflow-hidden">
        {categories.map((category) => (
          <div
            key={category._id}
            className="relative border hover:shadow-md transition-all"
          >
            <CategoryCard category={category} />
          </div>
        ))}
      </div>
    </div>
  );
}
