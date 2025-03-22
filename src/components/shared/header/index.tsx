import React from "react";
import Container from "../container";
import Link from "next/link";
import { Leaf } from "lucide-react";
import UserButton from "@/components/shared/user-button";

const Header = () => {
  return (
    <header className="border-b w-full fixed h-16 shadow-sm bg-white">
      <Container>
        <div className="flex w-full items-center justify-between py-4">
          <Link href="/">
            <div className="flex items-center">
              <Leaf size={24} />
              <span>Neploom</span>
            </div>
          </Link>
          <UserButton />
        </div>
      </Container>
    </header>
  );
};

export default Header;
