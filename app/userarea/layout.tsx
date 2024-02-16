import type { Metadata } from "next";
import { LoginRequired } from "../(components)/Auth";
import { Nunito } from "next/font/google";

const font = Nunito({
 subsets: ["latin"],
 weight: "400",
});

export const metadata: Metadata = {
 title: "Dashboard",
};

export default function RootLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return <LoginRequired path="/getting-started">
  <div className={font.className}>
   {children}
  </div>
 </LoginRequired>
}
