import { Image, LayoutDashboard, List, ShoppingBag, ShoppingCart, Users } from "lucide-react";

// Constants for Footer Links
export const SHOP_LINKS = [
  { label: "Traditional Wear", href: "/category/traditional" },
  { label: "Modern Fusion", href: "/category/fusion" },
  { label: "Accessories", href: "/category/accessories" },
  { label: "Home Decor", href: "/category/home-decor" },
  { label: "New Arrivals", href: "/new-arrivals" },
];

export const COMPANY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Careers", href: "/careers" },
];

export const CUSTOMER_SERVICE_LINKS = [
  { label: "Help Center", href: "/help" },
  { label: "Shipping & Delivery", href: "/shipping" },
  { label: "Returns & Exchanges", href: "/returns" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

export const ADMIN_NAV_ITEMS = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Home Banner",
    url: "/admin/homebanner",
    icon: Image,
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: ShoppingBag,
  },
  {
    title: "Categories",
    url: "/admin/categories",
    icon: List,
  },
  {
    title: "Orders",
    url: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "Customers",
    url: "/admin/customers",
    icon: Users,
  },
];
