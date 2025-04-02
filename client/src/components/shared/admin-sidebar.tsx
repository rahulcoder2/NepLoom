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
import { ADMIN_NAV_ITEMS } from "@/constant";

export default function AdminSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="my-1">
        <div className="flex items-center justify-between px-2 gap-2">
          <Link href={"/admin/dashboard"}>
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
              {ADMIN_NAV_ITEMS.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="h-14 hover:bg-primary hover:text-white active:text-white active:bg-primary"
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
