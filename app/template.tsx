"use client";

import { animatePageIn } from "@/app/(components)/transition/animations";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { RotateMotion } from "./(components)/motion";

export default function Template({ children }: { children: React.ReactNode }) {

 useEffect(() => {
  animatePageIn();
 }, []);

 const pathname = usePathname()

 if (pathname.startsWith("/admin")) return <div className="max-w-screen min-h-screen">{children}</div>

 return (
  <div className="max-w-screen min-h-screen">
   <div
    className="fixed hidden lg:flex justify-center bg-background left-0 right-0 bottom-0 top-0 w-screen h-screen z-50 overflow-y-hidden max-h-full"
    id="transition-element"
   >
    <div id="transition-logo" className="h-full flex flex-col justify-center">
     <RotateMotion className="w-full flex justify-center">
      <Image src="/logo.png" alt="" width={400} height={400} className="w-36" />
     </RotateMotion>
    </div>
   </div>
   {children}
  </div>
 );
}
