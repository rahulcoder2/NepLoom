import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";



interface CategoryCardProps {
    category: {
        _id: number;
        name: string;
        icon: string;
    };
    className?: string;
}



const CategoryCard = ({category, className}:CategoryCardProps) => {
  return (
    <>
      <Link
        href={`/categories/${category._id}`}
        className={cn(
          "flex flex-col items-center transition-all hover:scale-105"
        , className)}
        aria-label={`Browse ${category.name} category`}
      >
        <div className="relative mb-3 h-16 w-16">
          <Image
            src={category.icon || "/placeholder.svg"}
            alt={`${category.name} Category Icon`}
            fill
            className="object-contain"
          />
        </div>
        <span className="text-sm font-medium">{category.name}</span>
      </Link>
    </>
  );
};

export default CategoryCard;
