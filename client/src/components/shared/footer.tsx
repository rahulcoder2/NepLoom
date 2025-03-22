import { COMPANY_LINKS, CUSTOMER_SERVICE_LINKS, SHOP_LINKS } from "@/constant";
import Link from "next/link";
import Container from "./container";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-muted/30">
      <Container className="py-8 sm:py-10">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold text-[#FF5722]">Neploom</span>
            </Link>

            <p className="text-sm text-muted-foreground">
              NepLoom brings you authentic Nepali clothing and handicrafts,
              blending traditional craftsmanship with modern designs.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-sm sm:text-base mb-3 sm:mb-4">
              Shop
            </h3>
            <ul className="space-y-1 sm:space-y-2">
              {SHOP_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-sm sm:text-base mb-3 sm:mb-4">
              Company
            </h3>
            <ul className="space-y-1 sm:space-y-2">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-sm sm:text-base mb-3 sm:mb-4">
              Customer Service
            </h3>
            <ul className="space-y-1 sm:space-y-2">
              {CUSTOMER_SERVICE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 sm:mt-10 pt-4 sm:pt-6 flex flex-col md:flex-row justify-center items-center gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} NepLoom. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
