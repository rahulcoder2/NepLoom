"use client";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Container from "./container";
import { useIsScroll } from "@/hooks/use-scroll";
import UserButton from "./user-button";
import SearchBar from "./search-bar";

export default function Header() {
  const scrolled = useIsScroll();

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-primary transition-all duration-300",
        scrolled ? "border-b shadow-sm" : ""
      )}
    >
      <Container className="flex h-16 items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-white">Neploom</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Search Bar (Handles both Desktop & Mobile) */}
          <SearchBar />

          {/* Cart */}
          <Button
            variant="ghost" // Use `variant="ghost"` for a transparent button
            size="icon"
            asChild
            className="relative text-white hover:text-primary"
          >
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-primary">
                3
              </span>
            </Link>
          </Button>

          {/* User Login / Profile */}
          <UserButton />
        </div>
      </Container>
    </header>
  );
}
