"use client";

import { CookiesProvider } from "react-cookie";

export default async function CookieProvider({ children }: { children:any }) {
 return <CookiesProvider>
  {children}
 </CookiesProvider>
}
