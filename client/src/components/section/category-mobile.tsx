"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export interface CategoryMobileProps {
  categories: {
    id: number;
    name: string;
    slug: string;
    icon: string;
    productCount?: number;
  }[];
}

export function CategoryMobile({ categories }: CategoryMobileProps) {
  return (
    <Carousel opts={{ dragFree: true }} className="w-full">
      <CarouselContent className="-ml-2 ">
        {categories.map((category) => (
          <CarouselItem
            key={category.id}
            className="pl-2 basis-1/3"
          >
            <Link
              href={`/categories/${category.slug}`}
              className="flex flex-col items-center rounded-md border border-gray-200 bg-white p-4 transition-all hover:border-[#FF5722]/30 hover:shadow-md"
              aria-label={`Browse ${category.name} category`}
            >
              <div className="relative mb-2 h-12 w-12">
                <Image
                  src={category.icon || "/placeholder.svg"}
                  alt={`${category.name} Category Icon`}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-center text-xs font-medium">
                {category.name}
              </span>
              {category.productCount && (
                <span className="mt-1 text-[10px] text-muted-foreground">
                  {category.productCount} products
                </span>
              )}
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
