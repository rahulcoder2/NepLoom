"use client";

import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { CategoryMobile } from "./category-mobile";
import { CategoryDesktop } from "./category-desktop";
import axios from "axios";

interface Category {
  _id: string;
  name: string;
  image: {
    url: string;
  }
}

export default function CategorySection() {
  const isMobile = useIsMobile();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/categories`
        );
        setCategories(response.data.categories.categories);
      } catch (err: unknown) {
        console.error("Failed to fetch categories:", err);
      }
    };

    fetchCategories();
  }, [isMobile]);

  return (
    <>
      {isMobile ? (
        <CategoryMobile categories={categories} />
      ) : (
        <CategoryDesktop categories={categories} />
      )}
    </>
  );
}
