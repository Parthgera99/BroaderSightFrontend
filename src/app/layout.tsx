import type { Metadata } from "next";
import "./globals.css";
import { Montserrat, Montserrat_Alternates } from "next/font/google";
import { cookies } from "next/headers";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider } from "@/context/UserContext";


export const metadata: Metadata = {
  title: "BroaderSight Blogs",
  description: "BroaderSight Blogs is your go to blogging platform to read blogs and earn money by writing blogs. This is the Best and Easiest Blog Generator with Highly informative blogs.",
  icons: {
    icon: "/favicon.svg", // or .png/.svg depending on your file
  },
};

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat", // Define a CSS variable
});

const montserrat_alt = Montserrat_Alternates({
  subsets: ['latin'],
  weight: [ '400', '700'],
  variable: '--font-montserrat-alt',
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const cookieStore = await cookies(); // Get all cookies
  const theme = cookieStore.get("theme")?.value || "dark";

  return (
    <html lang="en" className={`${montserrat.variable} ${montserrat_alt.variable} ${cn(theme === "dark" && "dark")}`}>
      <AuthProvider>
      <body className="bg-white dark:bg-zinc-900 ">
        <Navbar/>
        <div className="pt-[77.8px]">
        {children}
          </div>
        <Toaster position="top-right" richColors />
        
      </body>
      </AuthProvider>
    </html>
  );
}
