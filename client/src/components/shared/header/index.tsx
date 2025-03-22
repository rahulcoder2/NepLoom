import Link from "next/link";
import { Leaf, ShoppingCart } from "lucide-react";
import UserButton from "@/components/shared/user-button";
import Container from "../container";

const Header = () => {
  const totalItems = 5;

  return (
    <header className="border-b w-full fixed top-0 left-0 right-0 h-16 shadow-sm bg-white z-50">
      <Container>
        <div className="flex w-full items-center justify-between py-4">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-2">
              <Leaf size={24} />
              <span className="text-lg font-semibold">Neploom</span>
            </div>
          </Link>

          {/* Right Side (Cart & User Button) */}
          <div className="flex items-center gap-6">
            {/* Cart Icon */}
            <Link href="/cart" className="relative">
              <ShoppingCart
                size={28}
                className="text-gray-700 hover:text-black transition"
              />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* User Button */}
            <UserButton />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
