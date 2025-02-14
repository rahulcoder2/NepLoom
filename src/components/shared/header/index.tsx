import React from "react";
import Container from "../container";
import Link from "next/link";
import { Leaf } from "lucide-react";
import UserButton from "@/components/shared/user-button";

const Header = () => {
  return (
    <header className="border-b h-16 flex items-center justify-center shadow-sm">
      <Container className="flex items-center justify-between">
        <Link href="/" className="flex-shrink-0 flex items-center">
          <Leaf className="h-8 w-8 text-green-600" />
          <span className="ml-2 h3 hidden md:block">Neploom</span>
        </Link>

        <UserButton />
      </Container>
    </header>
  );
};

export default Header;
