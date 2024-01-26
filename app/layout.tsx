import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google";
import "./globals.css";
import "@/sql/models";
import { Toaster } from "@/components/ui/sonner";

const font = Inter({
 subsets: ["latin"],
 weight: "400",
});

export const metadata: Metadata = {
 title: {
  default: "SwiftReach",
  template: "%s | SwiftReach",
 },
 description: "In A Swift, Reach New Horizons!",
 icons: [
  {
   url: "/logo.png",
   href: "/logo.png",
  },
 ],
};

export default function RootLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return (
  <html className="scroll-smooth w-full h-full" lang="de">
   <body className={font.className + " w-screen scrollbar-hidden"}>
    <ThemeProvider
     attribute="class"
     defaultTheme="dark"
     enableSystem
     disableTransitionOnChange
    >
     {children}
     <Toaster duration={5000} />
    </ThemeProvider>
   </body>
  </html>
 );
}
