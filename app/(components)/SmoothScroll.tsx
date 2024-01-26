"use client";

import { useEffect, useRef } from "react";

export default function Link({ children }: { children: React.ReactNode }) {

 const scrollContainer = useRef<HTMLElement>()

 useEffect(() => {
  (async () => {
   const LocomotiveScroll = (await import("locomotive-scroll")).default;

   if (!scrollContainer) {
    console.warn(
     "locomotive-scroll: [data-scroll-container] dataset was not found. You likely forgot to add it which will prevent Locomotive Scroll to work."
    );
   }

   new LocomotiveScroll({
    el: scrollContainer ?? undefined,
    reloadOnContextChange: true,
    smooth: true
   });

  })();
 }, []);

 return <div data-scroll-container ref={scrollContainer}>
  {children}
 </div>
}