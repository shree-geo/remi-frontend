import { BoxesIcon, Users } from "lucide-react";

interface IMenu {
  title: string;
  url: string;
  icon: React.ReactNode;
  items?: Array<{ title: string; url: string }>;
  isCollapsible: boolean;
}

export const allMenus: Record<string, Array<IMenu>> = {
  settings: [
    {
      title: "User Management",
      url: "/settings/users",
      icon: <Users />,
      isCollapsible: false,
    },
  ],

  example: [
    {
      title: "Example",
      url: "/example",
      icon: <BoxesIcon />,
      isCollapsible: false,
    },
  ],
};
