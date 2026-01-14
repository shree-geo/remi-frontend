import { Card } from "@/components/ui/card";
import { SidebarGroup, SidebarMenu } from "@/components/ui/sidebar";
import { NavItem } from "@/layouts/auth/navItem";
import { KeyRoundIcon, UserIcon, UserPenIcon } from "lucide-react";

export default function ProfileLayout({ children }: LayoutProps<"/[lang]/me">) {
  return (
    <Card className="grid grid-cols-12">
      <div className="col-span-4">
        <SidebarGroup>
          <SidebarMenu>
            <NavItem
              item={{
                title: "Profile",
                url: "/me",
                icon: <UserIcon />,
                items: [],
                isCollapsible: false,
              }}
            />
          </SidebarMenu>
          <SidebarMenu>
            <NavItem
              item={{
                title: "Edit Profile",
                url: "/me/edit",
                icon: <UserPenIcon />,
                items: [],
                isCollapsible: false,
              }}
            />
          </SidebarMenu>

          <SidebarMenu>
            <NavItem
              item={{
                title: "Change Password",
                url: "/me/change-password",
                icon: <KeyRoundIcon />,
                items: [],
                isCollapsible: false,
              }}
            />
          </SidebarMenu>
        </SidebarGroup>
      </div>
      <div className="col-span-8">{children}</div>
    </Card>
  );
}
