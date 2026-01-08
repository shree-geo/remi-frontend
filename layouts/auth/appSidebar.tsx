import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import type { ComponentProps } from "react";
import { DynamicNav } from "./dynamicNav";
import { NavUser } from "./navUser";

export function AppSidebar({
  brandHeader,
  ...props
}: ComponentProps<typeof Sidebar> & { brandHeader?: React.ReactNode }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>{brandHeader}</SidebarHeader>
      <SidebarContent>
        <DynamicNav />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
