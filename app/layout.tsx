import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "@/sql/models";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const font = Inter({
 subsets: ["latin"],
 weight: "400",
});

export const metadata: Metadata = {
 metadataBase: new URL("https://swiftreach.de"),
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
 authors: [{ name: "Nick Singerer", url: "nick.singerer.com" }],
 applicationName: "SwiftReach",
 creator: "Nick Singerer",
 keywords: [],
 twitter: {
  card: 'summary_large_image',
  title: 'SwiftReach',
  description: '',
  siteId: '1467726470533754880',
  creator: '@nicksingerer',
  creatorId: '1467726470533754880',
  images: {
   url: '/logo.png',
   alt: 'SwiftReach Logo',
  }
 },
 openGraph: {
  title: 'SwiftReach',
  description: '',
  url: 'https://swiftreach.de',
  siteName: 'SwiftReach',
  images: [
   {
    url: '/logo.png',
    width: 800,
    height: 600,
   }
  ],
  locale: 'de_DE',
  type: 'website',
 },
 robots: {
  index: false,
  follow: true,
  nocache: true,
  googleBot: {
   index: true,
   follow: false,
   noimageindex: true,
   'max-video-preview': -1,
   'max-image-preview': 'large',
   'max-snippet': -1,
  },
 },
 verification: {
  google: 'google',
  yandex: 'yandex',
  yahoo: 'yahoo'
 },
 category: "technology",
 publisher: "SwiftReach",
};

export default function RootLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return (
  <html className="scrollbar-hidden w-full h-full" lang="de">
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
