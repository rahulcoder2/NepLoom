import AdminHeader from "@/components/shared/admin-header";
import AdminSidebar from "@/components/shared/admin-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col w-full">
        <AdminHeader />
        <div className="flex gap-2">
          <AdminSidebar />
          <main className="flex flex-col w-full">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
