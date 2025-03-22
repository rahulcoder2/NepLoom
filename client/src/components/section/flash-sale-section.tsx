import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Clock} from "lucide-react";
import ProductCard from "../shared/product-card";

// Display products
const displayProducts = [
    {
        _id: "1",
        name: "Product 1",
        price: 100,
        discount: 20,
        image: "/images/product/product-1.jpg",
    },
    {
        _id: "2",
        name: "Product 2",
        price: 200,
        discount: 50,
        image: "/images/product/product-2.jpg",
    },
    {
        _id: "3",
        name: "Product 3",
        price: 300,
        discount: 100,
        image: "/images/product/product-3.jpg",
    },
    {
        _id: "4",
        name: "Product 4",
        price: 400,
        discount: 150,
        image: "/images/product/product-4.jpg",
    },
    {
        _id: "5",
        name: "Product 5",
        price: 500,
        discount: 200,
        image: "/images/product/product-5.jpg",
    },
    {
        _id: "6",
        name: "Product 6",
        price: 600,
        discount: 250,
        image: "/images/product/product-6.jpg",
    },
    {
        _id: "7",
        name: "Product 7",
        price: 700,
        discount: 300,
        image: "/images/product/product-7.jpg",
    },
    {
        _id: "8",
        name: "Product 8",
        price: 800,
        discount: 350,
        image: "/images/product/product-8.jpg",
    },
    {
        _id: "9",
        name: "Product 9",
        price: 900,
        discount: 400,
        image: "/images/product/product-9.jpg",
    },
    {
        _id: "10",
        name: "Product 10",
        price: 1000,
        discount: 450,
        image: "/images/product/product-10.jpg",
    },
    ];


export default function FlashSaleSection() {

  
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <Clock size={16} className="text-primary" />
          <span>Ends in: 12:34:56</span>
        </div>
      </div>

      <Carousel className="w-full" opts={{ dragFree: true }}>
        <CarouselContent className="-ml-2 md:-ml-4">
          {displayProducts.map((product) => (
            <CarouselItem
              key={product._id}
              className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
            >
              <ProductCard
                product={product}
                originalPrice={(product as any).originalPrice}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:block">
          <CarouselPrevious className="left-1 bg-white/80" />
          <CarouselNext className="right-1 bg-white/80" />
        </div>
      </Carousel>
    </div>
  );
}
