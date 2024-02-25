"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { Scroll } from "react-locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import {gsap} from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"

export default function SmoothScroll({ children, otherProps }: { children: React.ReactNode, otherProps?: any[] }) {

 const locomotiveScrollRef = useRef<Scroll | null>(null);
 const pathname = usePathname()
 const container = useRef<HTMLDivElement>(null)

 useEffect(() => {
  (async () => {
   const LocomotiveScroll = (await import("locomotive-scroll")).default;

   locomotiveScrollRef.current = new LocomotiveScroll({
    ...otherProps,
    smooth: true,
    el: container.current!,
    reloadOnContextChange: true
   });

   locomotiveScrollRef.current.on("scroll", ScrollTrigger.update);

   return () => {
    locomotiveScrollRef.current?.destroy();
   };
  })();
 }, [pathname, container, otherProps]);

 return <div data-scroll-container data-scroll-section ref={container}>
  {children}
 </div>;

}