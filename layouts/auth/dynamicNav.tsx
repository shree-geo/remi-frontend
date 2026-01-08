import { DynamicIcon } from "lucide-react/dynamic";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { NavItem } from "./navItem";

export async function DynamicNav() {
  // Fetch all menu items with their children
  const allMenus: Record<
    string,
    Array<{
      title: string;
      url: string;
      icon: React.ReactNode;
      items: Array<{ title: string; url: string }>;
      isCollapsible: boolean;
    }>
  > = {};

  return (
    <>
      <SidebarGroup>
        <SidebarMenu>
          <NavItem
            item={{
              title: "Dashboard",
              url: "/dashboard",
              icon: <DynamicIcon name="layout-dashboard" />,
              items: [],
              isCollapsible: false,
            }}
          />
        </SidebarMenu>
      </SidebarGroup>
      {Object.entries(allMenus).map(([groupName, menus]) => (
        <SidebarGroup key={groupName}>
          <SidebarGroupLabel>{groupName}</SidebarGroupLabel>
          <SidebarMenu>
            {menus.map((item) => (
              <NavItem key={item.title} item={item} />
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}
