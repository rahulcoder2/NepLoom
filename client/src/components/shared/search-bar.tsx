"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const SearchBar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); 

  return (
    <>
      {/* Desktop Search Bar */}
      <div className="hidden md:flex flex-1 justify-center px-4 max-w-md">
        <div className="relative w-full">
          {/* Search Icon */}
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />

          {/* Input Field */}
          <Input
            type="text" 
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 rounded-full bg-white text-primary placeholder:text-primary"
          />

          {/* Custom Clear Button */}
          {searchQuery && (
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 text-primary"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Search Button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden text-white hover:text-primary"
        onClick={() => setSearchOpen(!searchOpen)}
      >
        <Search className="h-5 w-5" />
        <span className="sr-only">Search</span>
      </Button>

      {/* Mobile Search Bar */}
      {searchOpen && (
        <div className="absolute left-0 top-16 w-full border-t p-3 bg-primary shadow-md md:hidden">
          <div className="relative">
            {/* Search Icon */}
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />

            {/* Input Field */}
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 rounded-full bg-white placeholder:text-primary"
              autoFocus
            />

            {/* Custom Clear Button for Mobile */}
            {searchQuery && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-primary"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchBar;
