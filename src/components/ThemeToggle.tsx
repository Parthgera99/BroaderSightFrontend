// components/ThemeToggle.tsx
"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = document.cookie.split("; ").find(row => row.startsWith("theme="))?.split("=")[1] || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    document.cookie = `theme=${newTheme}; path=/; max-age=31536000`; // Store in cookies for 1 year
  };

  return (
    <Button onClick={toggleTheme} variant="nav" className="size-[100%]">
      {theme === "light" ?  <div className="flex gap-5 items-center hover:text-purple-700 dark:hover:text-purple-200"><h2>DarkMode</h2> <Moon className="w-5 h-5" /></div> :  <div className="flex gap-5 items-center hover:text-purple-700 dark:hover:text-purple-200"><h2>LightMode</h2> <Sun className="w-5 h-5" /></div>}
    </Button>
  );
}
