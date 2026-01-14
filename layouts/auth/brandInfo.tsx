import STranslation from "@/components/molecules/translations/STranslation";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";

export async function BrandInfo() {
  const brand = {
    name: "RMIS Nepal",
    logo: "/gov-logo.png",
    link: "/dashboard",
  };
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          asChild
        >
          <Link href={brand.link}>
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-slate-200">
              <Image
                src={brand.logo}
                alt={brand.name}
                width={24}
                height={24}
                className="w-auto h-auto"
              />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <STranslation
                tKey="brand.name"
                className="truncate font-semibold"
              />
              <STranslation tKey="brand.slogan" className="truncate text-xs" />
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
