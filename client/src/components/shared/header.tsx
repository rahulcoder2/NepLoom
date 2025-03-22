"use client";

import Link from "next/link";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState} from "react";
import { cn } from "@/lib/utils";
import Container from "./container";
import { useScroll } from "@/hooks/use-scroll";

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrolled = useScroll();

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-background transition-all duration-300",
        scrolled ? "border-b shadow-sm" : ""
      )}
    >
      <Container className="flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary" >Neploom</span>
        </Link>

        {/* Search - Desktop */}
        <div className="hidden md:flex md:flex-1 md:justify-center md:px-4 md:max-w-xl mx-auto">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 rounded-full border-[#FF5722]/20 focus-visible:ring-[#FF5722]/30"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Search - Mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          {/* Cart */}
          <Button variant="ghost" size="icon" asChild className="relative">
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#FF5722] text-[10px] font-bold text-white">
                3
              </span>
            </Link>
          </Button>

          {/* Login */}
          <Button variant="outline" size="sm" className="gap-2 hidden sm:flex">
            <User className="h-4 w-4" />
            <span>Login</span>
          </Button>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </Container>

      {/* Mobile Search Expanded */}
      {searchOpen && (
        <div className="border-t p-3 md:hidden bg-background">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full pl-10 rounded-full border-[#FF5722]/20"
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t p-4 sm:hidden bg-background">
          <nav className="flex flex-col space-y-3">
            <Link
              href="/login"
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted"
            >
              <User className="h-4 w-4" />
              <span>Login / Register</span>
            </Link>
            <Link
              href="/categories"
              className="px-3 py-2 rounded-md hover:bg-muted"
            >
              Categories
            </Link>
            <Link href="/deals" className="px-3 py-2 rounded-md hover:bg-muted">
              Today&apos;s Deals
            </Link>
            <Link
              href="/orders"
              className="px-3 py-2 rounded-md hover:bg-muted"
            >
              My Orders
            </Link>
            <Link href="/help" className="px-3 py-2 rounded-md hover:bg-muted">
              Help & Support
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
