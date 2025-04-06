"use client";

import { FC, ReactNode } from "react";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { LockKeyholeIcon } from "lucide-react";

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
    <nav className="flex justify-between max-sm:justify-center items-center border-b bg-purple-200 max-sm:bg-violet-200 max-sm:dark:bg-violet-800 dark:bg-purple-900">
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={`px-4 max-sm:px-4 w-full max-sm:w-fit text-center py-2 ${
            pathname === href ? "bg-purple-500 max-sm:bg-violet-500 text-white" : "hover:bg-purple-300 dark:hover:bg-purple-700"
          }`}
        >
          {label}
          {label === "Preview" && <LockKeyholeIcon className="inline-block ml-2 w-4 h-4" />}
          {label === "Change Order" && <LockKeyholeIcon className="inline-block ml-2 w-4 h-4" />}
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
      <main className="p-4 max-w-[1500px] 2xl:mx-auto">{children}</main>
    </div>
  );
};

export default BlogLayout;
