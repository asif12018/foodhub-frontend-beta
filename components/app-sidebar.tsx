import * as React from "react";

import { SearchForm } from "@/components/search-form";
import { VersionSwitcher } from "@/components/version-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
};

const adminNav = [
  { title: "Admin Stats", url: "/dashboard/adminStats" },
  { title: "View Order", url: "/dashboard/viewOrder" },
  { title: "Manage User", url: "/dashboard/manageUser" },
  { title: "Manage Categories", url: "/dashboard/manageCategories" },
  { title: "Add Categories", url: "/dashboard/addCategories" },
  { title: "Home", url: "/" }
];

const customerNav = [
  { title: "My Profile", url: "/profile" },
  { title: "My Orders", url: "/my-order" },
  { title: "Cart", url: "/cart" },
  { title: "Home", url: "/" }
];

const providerNav = [
  { title: "Provider Stats", url: "/providerStats" },
  { title: "My Menu", url: "/my-menu" },
  { title: "Add Menu", url: "/add-menu" },
  { title: "My Orders", url: "/my-order" },
  { title: "Home", url: "/" }
];

export function AppSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & { user?: any }) {
  let currentNav = customerNav;
  if (user?.roles === "Admin") currentNav = adminNav;
  else if (user?.roles === "Provider") currentNav = providerNav;

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        />
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {currentNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>{item.title}</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
