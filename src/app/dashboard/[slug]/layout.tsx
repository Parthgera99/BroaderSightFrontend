"use client";

import { FC, ReactNode } from "react";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";

interface BlogLayoutProps {
  children: ReactNode;
}

const BlogSubNavbar: FC<{ slug: string }> = ({ slug }) => {
  const pathname = usePathname();

  const links = [
    { href: `/dashboard/${slug}/edit`, label: "Edit" },
    { href: `/dashboard/${slug}/preview`, label: "Preview" },
    { href: `/dashboard/${slug}/change-order`, label: "Change Order" },
  ];

  return (
    <nav className="flex justify-between border-b px-2 bg-purple-200 dark:bg-purple-900">
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={`px-4 w-full text-center py-2 ${
            pathname === href ? "bg-purple-500 text-white" : "hover:bg-purple-300 dark:hover:bg-purple-700"
          }`}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
};

const BlogLayout: FC<BlogLayoutProps> = ({ children }) => {
  const params = useParams(); // ✅ Fix: Unwrap params correctly
  const slug = params.slug as string; // ✅ Ensure slug is a string

  return (
    <div>
      <BlogSubNavbar slug={slug} />
      <main className="p-4">{children}</main>
    </div>
  );
};

export default BlogLayout;
