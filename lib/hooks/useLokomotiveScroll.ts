"use client";

import React, { useEffect, useRef } from "react";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { LocomotiveScrollOptions, Scroll } from "react-locomotive-scroll";
import { usePathname, useRouter } from "next/navigation";

type UseLocomotiveScrollHook = [React.RefObject<Scroll>];

const useLocomotiveScroll = ({
 ...otherProps
}: Omit<LocomotiveScrollOptions, "el">): UseLocomotiveScrollHook => {
 const locomotiveScrollRef = useRef<Scroll | null>(null);

 const pathname = usePathname()

 useEffect(() => {
  (async () => {
   const LocomotiveScroll = (await import("locomotive-scroll")).default;

   const dataScrollContainer = document.querySelector(
    "[data-scroll-container]"
   ) as HTMLElement;

   if (!dataScrollContainer) {
    console.warn(
     "locomotive-scroll: [data-scroll-container] dataset was not found. You likely forgot to add it which will prevent Locomotive Scroll to work."
    );
   }

   locomotiveScrollRef.current = new LocomotiveScroll({
    ...otherProps,
    el: dataScrollContainer ?? undefined,
    reloadOnContextChange: true
   });

   return () => {
    locomotiveScrollRef.current?.destroy();
   };
  })();
 }, [pathname]);
 return [locomotiveScrollRef];
};
export default useLocomotiveScroll;
