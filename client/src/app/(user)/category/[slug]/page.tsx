import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

// This would typically come from a database
const categories = [
  {
    id: 1,
    name: "Phones & Accessories",
    slug: "phones-accessories",
    category: "electronics",
    description:
      "Browse the latest smartphones, cases, chargers, and accessories.",
    image: "/placeholder.svg?height=300&width=1200",
  },
  {
    id: 2,
    name: "Watches",
    slug: "watches",
    category: "accessories",
    description: "Discover stylish watches for every occasion and budget.",
    image: "/placeholder.svg?height=300&width=1200",
  },
  {
    id: 3,
    name: "Cleaning & Household",
    slug: "cleaning-household",
    category: "household",
    description:
      "Find everything you need to keep your home clean and organized.",
    image: "/placeholder.svg?height=300&width=1200",
  },
  {
    id: 4,
    name: "Clothing & Shoes",
    slug: "clothing-shoes",
    category: "clothing",
    description: "Shop the latest fashion trends in clothing and footwear.",
    image: "/placeholder.svg?height=300&width=1200",
  },
  {
    id: 5,
    name: "Tools & DIY",
    slug: "tools-diy",
    category: "tools",
    description: "Get the right tools and supplies for your DIY projects.",
    image: "/placeholder.svg?height=300&width=1200",
  },
  {
    id: 6,
    name: "Computers",
    slug: "computers",
    category: "electronics",
    description: "Explore laptops, desktops, and computer accessories.",
    image: "/placeholder.svg?height=300&width=1200",
  },
  {
    id: 7,
    name: "Photo & Video",
    slug: "photo-video",
    category: "electronics",
    description:
      "Capture your moments with quality cameras and video equipment.",
    image: "/placeholder.svg?height=300&width=1200",
  },
  {
    id: 8,
    name: "Beauty & Skincare",
    slug: "beauty-skincare",
    category: "beauty",
    description:
      "Discover beauty products and skincare essentials for your routine.",
    image: "/placeholder.svg?height=300&width=1200",
  },
];

export default function CategoryPage({ params }: { params: { slug: string } }) {
  // Find the category by slug
  const category = categories.find((item) => item.slug === params.slug);

  // If category not found, return 404
  if (!category) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Category header with banner image */}
      <div className="mb-8">
        <Link
          href="/categories"
          className="mb-4 inline-flex items-center text-sm text-gray-600 hover:text-[#FF5722]"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Categories
        </Link>

        <div className="relative mb-4 h-40 w-full overflow-hidden rounded-lg md:h-60">
          <Image
            src={category.image || "/placeholder.svg"}
            alt={category.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6">
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              {category.name}
            </h1>
          </div>
        </div>

        <p className="text-muted-foreground">{category.description}</p>
      </div>
    </div>
  );
}
