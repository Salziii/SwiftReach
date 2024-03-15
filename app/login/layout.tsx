import type { Metadata } from "next";
import { LoginForbidden } from "../(components)/Auth";

export const metadata: Metadata = {
 title: "Login",
};

export default function RootLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return (
  <LoginForbidden path="/">
   {children}
  </LoginForbidden>
 );
}
