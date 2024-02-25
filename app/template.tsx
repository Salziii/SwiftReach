"use client";

import { useEffect } from "react";
import { animatePageIn } from "@/app/(components)/transition/animations";
import Image from "next/image"
import { RotateMotion } from "./(components)/motion";

export default function Template({ children }: { children: React.ReactNode }) {
 // useEffect(() => {
 //  animatePageIn();
 // }, []);

 // return (
 //  <div>
 //   <div
 //    className="fixed hidden lg:flex justify-center bg-background left-0 right-0 bottom-0 top-0 w-screen h-screen z-50 overflow-y-hidden max-h-full"
 //    id="transition-element"
 //   >
 //    <div id="transition-logo" className="h-full flex flex-col justify-center">
 //     <RotateMotion className="w-full flex justify-center">
 //      <Image src="/logo.png" alt="" width={400} height={400} className="w-36" />
 //     </RotateMotion>
 //    </div>
 //   </div>
 //   {children}
 //  </div>
 // );

 return children;
}
