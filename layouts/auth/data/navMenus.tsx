import { Users } from "lucide-react";

export const allMenus: Record<
  string,
  Array<{
    title: string;
    url: string;
    icon: React.ReactNode;
    items?: Array<{ title: string; url: string }>;
    isCollapsible: boolean;
  }>
> = {
  settings: [
    {
      title: "User Management",
      url: "/settings/users",
      icon: <Users />,
      isCollapsible: false,
    },
  ],
};
