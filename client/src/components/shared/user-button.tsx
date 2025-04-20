"use client";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { logOut } from "@/redux/features/auth/auth-slice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { USER_ROLES } from "@/types/auth-types";

const UserButton = () => {

  const router = useRouter();
  const { isLoggedIn, userDetails } = useAppSelector((state) => state.auth); 

  const dispatch =useAppDispatch();

  const handleLogout = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/user/logout", {}, {
        withCredentials: true,
      }); 
      if (res.status === 200) {
        dispatch(logOut()); 
        router.push("/login");
        toast.success(res.data.message || "Logged out successfully!");
      } else {
        toast.error("Failed to logout");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("An error occurred during logout");
    }
  };

  if (!isLoggedIn) {
    return (
      <Button
        variant="outline"
        className="flex items-center gap-2 px-3 py-1 text-sm sm:px-4 sm:py-2 text-primary hover:text-primary"
        asChild
      >
        <Link href="/login" className="flex items-center gap-1 sm:gap-2 ">
          <UserIcon className="h-4 w-4" />
          <span>Login</span>
        </Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative cursor-pointer text-white">
          <UserIcon className="h-6 w-6" />
          <span className="sr-only">User menu</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-48">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/profile">Profile</Link>
        </DropdownMenuItem>
        {userDetails?.role === USER_ROLES.user && (
          <DropdownMenuItem>
            <Link href="/myorders">My Orders</Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
