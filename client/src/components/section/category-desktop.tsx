import { cn } from "@/lib/utils";
import CategoryCard from "../shared/category-card";

export interface CategoryDesktopProps {
  categories: {
    _id: number;
    name: string;
    icon: string;
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
                  key={category._id}
                  className={cn(
                    "p-4 text-center",
                    colIndex < columns - 1 && "border-r border-gray-200"
                  )}
                >
                  <CategoryCard category={category} />
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
