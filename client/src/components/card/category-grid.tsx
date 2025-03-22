import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    id: 1,
    name: "Mens Pure Silver Jewellery",
    image: "/images/silver-jewellery.jpg", // Category image URL
    link: "/category/1", // Link to the specific category page in NepLoom
  },
  {
    id: 2,
    name: "Traditional Nepali Clothing",
    image: "/images/traditional-clothing.jpg",
    link: "/category/2", // Link to category page for Traditional Nepali Clothing
  },
  {
    id: 3,
    name: "Nepali Handicrafts",
    image: "/images/handicrafts.jpg",
    link: "/category/3", // Link to category page for Nepali Handicrafts
  },
  {
    id: 4,
    name: "Modern Fashion",
    image: "/images/modern-fashion.jpg",
    link: "/category/4", // Link to category page for Modern Fashion
  },
  // Add more categories as needed
];

export default function CategoryGrid() {
  return (
    <div className="my-6">
      <h2 className="mb-4 text-xl font-bold">Shop by Category</h2>
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={category.link} // Navigate to category page
            className="flex flex-col items-center rounded-md border border-gray-200 p-2 transition-all hover:shadow-md"
          >
            <div className="relative mb-2">
              <Image
                src={category.image}
                alt={category.name}
                width={50} // Adjust size
                height={50}
                className="object-contain"
              />
            </div>
            <span className="text-center text-xs">{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
