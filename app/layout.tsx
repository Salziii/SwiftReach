import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

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
  <html lang="en">
   <body className={inter.className}>
   <ThemeProvider
      attribute="class"
      defaultTheme="system"
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
