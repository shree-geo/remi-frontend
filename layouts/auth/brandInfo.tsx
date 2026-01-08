import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";

export async function BrandInfo() {
  const brand = {
    name: "Next.js Template",
    logo: "/globe.svg",
    slogan: "Build your next app with Next.js",
  };
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          asChild
        >
          <Link href="/">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-slate-200">
              <Image src={brand.logo} alt={brand.name} width={24} height={24} />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{brand.name}</span>
              <span className="truncate text-xs">{brand.slogan}</span>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
