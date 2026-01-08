"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import React from "react";
import createPathNameForBreadCrumb from "./utils/createPathNameForBreadcrumb";

export function DynamicBreadcrumb() {
  const pathname = usePathname();
  const segments = createPathNameForBreadCrumb(pathname);
  const visibleSegments = segments.filter((segment) => segment.show);
  return (
    <Breadcrumb className="w-max rounded-xl px-4 py-2 border-none  bg-background">
      <BreadcrumbList>
        {visibleSegments.map((segment, index) => {
          const href = `/${segments
            .map((s) => s.key)
            .slice(0, index + 1)
            .join("/")}`;
          const isLast = index === visibleSegments.length - 1;

          return (
            <React.Fragment key={href}>
              <BreadcrumbItem className="hidden md:block">
                {isLast ? (
                  <BreadcrumbPage>{segment.title}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href}>{segment.title}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator className="hidden md:block" />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
