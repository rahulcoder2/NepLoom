"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useIsScroll } from "@/hooks/use-scroll";
import UserButton from "./user-button";
import SearchBar from "./search-bar";
import { SidebarTrigger } from "../ui/sidebar";

export default function AdminHeader() {
  const scrolled = useIsScroll();

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-primary transition-all duration-300",
        scrolled ? "border-b shadow-sm" : ""
      )}
    >
      <div className="flex px-3 h-16 items-center justify-between sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Sidebar Trigger */}
          <SidebarTrigger className="text-white hover:text-primary" />
          {/* Logo */}
          <Link href="/admin" className="flex items-center gap-2">
            <span className="text-xl font-bold text-white">Neploom</span>
          </Link>
        </div>
        <div className="hidden sm:flex">
          <SearchBar />
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Search Bar (Handles both Desktop & Mobile) */}
          <div className="sm:hidden flex-1">
            <SearchBar />
          </div>

          {/* User Login / Profile */}
          <UserButton />
        </div>
      </div>
    </header>
  );
}
