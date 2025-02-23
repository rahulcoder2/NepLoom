import React from "react";
import Container from "../container";
import Link from "next/link";
import { Leaf } from "lucide-react";
import UserButton from "@/components/shared/user-button";

const Header = () => {
  return (
    <header className="border-b w-full fixed top-0 left-0 right-0 h-16 shadow-sm bg-white z-50">
      <Container>
        <div className="flex w-full items-center justify-between py-4">
          <Link href="/">
            <div className="flex items-center gap-2">
              <Leaf size={24} />
              <span className="text-lg font-semibold">Neploom</span>
            </div>
          </Link>
          <UserButton />
        </div>
      </Container>
    </header>
  );
};

export default Header;
