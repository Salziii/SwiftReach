import type { Metadata } from "next";
import { RequireEmployee } from "../(components)/Auth";

export const metadata: Metadata = {
 title: "Admin",
};

export default function RootLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return (
  <RequireEmployee path="/">
   {children}
  </RequireEmployee>
 );
 
}
