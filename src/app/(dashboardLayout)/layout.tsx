import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { userService } from "@/services/user.service";
import { DashboardProfile } from "@/components/dashboard-profile";

export default async function DashboardLayout({
  children,
  admin,
  user,
  provider,
}: {
  children: React.ReactNode;
  admin: React.ReactNode;
  user: React.ReactNode;
  provider: React.ReactNode;
}) {
  const data = await userService.getSession();
  const userInfo = data?.data?.user;

  let dashboardContent = children;
  if (userInfo?.roles === "Admin") {
    dashboardContent = admin;
  } else if (userInfo?.roles === "Provider") {
    dashboardContent = provider;
  } else if (userInfo?.roles === "User" || userInfo?.roles === "Customer") {
    dashboardContent = user;
  }

  return (
    <SidebarProvider>
      <AppSidebar user={userInfo} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between border-b px-4 w-full">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </div>
          <DashboardProfile />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {dashboardContent}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
