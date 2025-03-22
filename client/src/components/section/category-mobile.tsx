
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import CategoryCard from "../shared/category-card";

export interface CategoryMobileProps {
  categories: {
    _id: number;
    name: string;
    icon: string;
  }[];
}

export function CategoryMobile({ categories }: CategoryMobileProps) {
  return (
    <Carousel opts={{ dragFree: true }} className="w-full">
      <CarouselContent className="-ml-2 ">
        {categories.map((category) => (
          <CarouselItem
            key={category._id}
            className="pl-2 basis-1/3"
          >
           <CategoryCard category={category} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
