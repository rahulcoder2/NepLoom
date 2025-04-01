"use client";

import { useState } from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";

const UserButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Set initial state as logged out

  return (
    <>
      {isLoggedIn ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="relative cursor-pointer text-white">
              <User className="h-6 w-6" />
              <span className="sr-only">User menu</span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="w-48">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/myorders">My Orders</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          variant="outline"
          className="flex items-center gap-2 px-3 py-1 text-sm sm:px-4 sm:py-2 text-primary hover:text-primary"
          asChild
        >
          <Link href="/login" className="flex items-center gap-1 sm:gap-2 ">
            <User className="h-4 w-4" />
            <span>Login</span>
          </Link>
        </Button>
      )}
    </>
  );
};

export default UserButton;
