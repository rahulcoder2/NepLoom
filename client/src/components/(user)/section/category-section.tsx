'use client'

import { useIsMobile } from "@/hooks/use-mobile";
import { CategoryMobile } from "./category-mobile";
import { CategoryDesktop } from "./category-desktop";

interface CategorySectionProps {
  categories: Category[];
}

export default function CategorySection({ categories }: CategorySectionProps) {
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? <CategoryMobile categories={categories} /> : <CategoryDesktop categories={categories} />}
    </>
  );
}