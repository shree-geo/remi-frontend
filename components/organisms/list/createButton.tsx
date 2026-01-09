"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CreateButton() {
  const pathname = usePathname();
  return (
    <Button asChild>
      <Link href={`${pathname}/create`}>Create</Link>
    </Button>
  );
}
