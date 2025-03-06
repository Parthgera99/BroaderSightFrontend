// src/components/layout/more-dropdown.tsx
"use client";

import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";

export function MoreDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="nav" className="text-base text-zinc-900 hover:text-purple-700 dark:hover:text-purple-200 dark:text-slate-50 font-semibold">More</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-48 bg-slate-50 dark:bg-zinc-900">
        <DropdownMenuItem className="px-auto">
          <Link href="/contact" className="w-full font-medium hover:text-purple-700 dark:hover:text-purple-200 text-base">Contact Us</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/faq" className="w-full font-medium hover:text-purple-700 dark:hover:text-purple-200 text-base">FAQ</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ThemeToggle />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
