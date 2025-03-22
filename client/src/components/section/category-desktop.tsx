import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface CategoryDesktopProps {
  categories: {
    id: number;
    name: string;
    slug: string;
    icon: string;
    productCount?: number;
  }[];
}

export function CategoryDesktop({ categories }: CategoryDesktopProps) {
  const columns = 4;
  const rows = Math.ceil(categories.length / columns);
  const tableRows = Array.from({ length: rows }, (_, rowIndex) =>
    categories.slice(rowIndex * columns, (rowIndex + 1) * columns)
  );

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      <table className="w-full border-collapse bg-white">
        <tbody>
          {tableRows.map((row, rowIndex) => (
            <tr
              key={`row-${rowIndex}`}
              className={cn(rowIndex < rows - 1 && "border-b border-gray-200")}
            >
              {row.map((category, colIndex) => (
                <td
                  key={category.id}
                  className={cn(
                    "p-4 text-center",
                    colIndex < columns - 1 && "border-r border-gray-200"
                  )}
                >
                  <Link
                    href={`/categories/${category.slug}`}
                    className="flex flex-col items-center transition-all hover:scale-105"
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
                    {category.productCount && (
                      <span className="mt-1 text-xs text-muted-foreground">
                        {category.productCount} products
                      </span>
                    )}
                  </Link>
                </td>
              ))}

              {row.length < columns &&
                Array.from({ length: columns - row.length }, (_, i) => (
                  <td key={`empty-${i}`} className="p-4"></td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}