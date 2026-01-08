import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import AuthProvider from "@/contexts/auth.context";
import { AppSidebar } from "@/layouts/auth/appSidebar";
import { BrandInfo } from "@/layouts/auth/brandInfo";
import { DynamicBreadcrumb } from "@/layouts/auth/breadcrumb";
import type { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      <SidebarProvider>
        <AppSidebar brandHeader={<BrandInfo />} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <DynamicBreadcrumb />
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 bg-background">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </AuthProvider>
  );
}
