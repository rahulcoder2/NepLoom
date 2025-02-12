import React from 'react'
import Container from '../container'
import Link from 'next/link'

const Header = () => {
  return (
    <header className="border-b h-16 flex items-center justify-center">
      <Container className="flex items-center justify-between">
        <Link href={"/"}>
          <h1 className="h2 font-inter">NepLoom</h1>
        </Link>

        <div className="flex items-center">
          <button>login</button>
        </div>
      </Container>
    </header>
  );
}

export default Header