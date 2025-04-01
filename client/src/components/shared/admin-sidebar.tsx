import { List, ShoppingBag, ShoppingCart, Users } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Separator } from "../ui/separator";

const AdminNavItems = [
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

export default function AdminSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="my-1">
        <div className="flex items-center justify-between px-2 gap-2">
          <Link href={"/admin"}>
            <span className="text-3xl font-bold text-primary">Neploom</span>
          </Link>
          <SidebarTrigger className="text-primary hover:text-primary" />
        </div>
      </SidebarHeader>
      <Separator />
      <SidebarContent className="mt-4 mx-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {AdminNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="h-14 text-primary hover:bg-primary hover:text-white active:text-white active:bg-primary"
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span className="text-2xl">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
