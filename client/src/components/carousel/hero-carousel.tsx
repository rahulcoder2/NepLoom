"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useRef, useState } from "react";
import Autoplay from 'embla-carousel-autoplay';
import { type CarouselApi } from "@/components/ui/carousel";
import Image from "next/image";
import { Button } from "../ui/button";

// Carousel data
const carouselItems = [
  {
    id: 1,
    title: "नयां सिजन, नयां बचत",
    subtitle: "Fresh Deals for a Fresh Season!",
    discount: "40% OFF",
    bgColor: "bg-[#FF5722]",
    textColor: "text-white",
    buttonColor: "bg-white text-[#FF5722] hover:bg-white/90",
    image: "/placeholder.svg?height=160&width=160",
    imageAlt: "Household products",
  },
  {
    id: 2,
    title: "SUPER BRAND DAY",
    subtitle: "UP TO 55% OFF",
    logo: "/placeholder.svg?height=40&width=100",
    logoAlt: "Anker logo",
    bgColor: "bg-[#E3F2FD]",
    textColor: "text-[#0D47A1]",
    buttonColor: "bg-[#FF5722] text-white hover:bg-[#FF5722]/90",
    image: "/placeholder.svg?height=160&width=160",
    imageAlt: "Anker products",
  },
  {
    id: 3,
    title: "WEEKEND SPECIAL",
    subtitle: "Limited Time Offers!",
    discount: "30% OFF",
    bgColor: "bg-[#4CAF50]",
    textColor: "text-white",
    buttonColor: "bg-white text-[#4CAF50] hover:bg-white/90",
    image: "/placeholder.svg?height=160&width=160",
    imageAlt: "Weekend special products",
  },
  {
    id: 4,
    title: "NEW ARRIVALS",
    subtitle: "Discover the Latest Products",
    bgColor: "bg-[#9C27B0]",
    textColor: "text-white",
    buttonColor: "bg-white text-[#9C27B0] hover:bg-white/90",
    image: "/placeholder.svg?height=160&width=160",
    imageAlt: "New arrival products",
  },
  {
    id: 5,
    title: "CLEARANCE SALE",
    subtitle: "Last Chance to Buy!",
    discount: "UP TO 70% OFF",
    bgColor: "bg-[#F44336]",
    textColor: "text-white",
    buttonColor: "bg-white text-[#F44336] hover:bg-white/90",
    image: "/placeholder.svg?height=160&width=160",
    imageAlt: "Clearance sale products",
  },
];

export default function HeroCarousel() {
    const plugin = useRef(
      Autoplay({ delay: 2000, stopOnInteraction: true })
    );

    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!api) {
        return;
      }

      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap() + 1);

      api.on("select", () => {
        setCurrent(api.selectedScrollSnap() + 1);
      });
    }, [api]);

    const goToSlide = (index: number) => {
    if (api) {
      api.scrollTo(index);
    }
  };

  return (
    <div className="relative">
      <Carousel
        className="w-full"
        setApi={setApi}
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {carouselItems.map((item) => (
            <CarouselItem key={item.id}>
              <div
                className={`relative h-[200px] sm:h-[240px] md:h-[280px] lg:h-[320px] w-full overflow-hidden rounded-lg ${item.bgColor} ${item.textColor}`}
              >
                <div className="absolute inset-0 flex flex-col justify-center p-4 sm:p-6 md:p-10">
                  <div className="flex flex-col gap-2 max-w-[80%] sm:max-w-[60%] md:max-w-[50%]">
                    {item.logo && (
                      <div className="flex items-center gap-2">
                        <Image
                          src={item.logo || "/placeholder.svg"}
                          alt={item.logoAlt || ""}
                          width={100}
                          height={40}
                          className="object-contain"
                        />
                      </div>
                    )}
                    <h2 className="text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl">
                      {item.title}
                    </h2>
                    <p className="text-lg font-medium sm:text-xl md:text-2xl">
                      {item.subtitle}
                    </p>
                    {item.discount && (
                      <div className="mt-1 flex items-center gap-2">
                        <span className="rounded-full bg-white px-3 py-1 text-lg font-bold text-[#FF5722]">
                          {item.discount}
                        </span>
                      </div>
                    )}
                    <Button
                      className={`mt-2 w-24 sm:w-28 md:w-32 px-3 py-2 ${item.buttonColor}`}
                    >
                      Shop Now
                    </Button>
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48 lg:h-56 lg:w-56">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.imageAlt}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:block">
          <CarouselPrevious className="left-2 bg-white/80 border-none shadow-md hover:bg-white/90 hover:scale-105 transition-all" />
          <CarouselNext className="right-2 bg-white/80 border-none shadow-md hover:bg-white/90 hover:scale-105 transition-all" />
        </div>
      </Carousel>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === current
                ? "bg-[hsl(69,92%,50%)] w-2"
                : "bg-white/70 w-2 hover:bg-white/90"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
