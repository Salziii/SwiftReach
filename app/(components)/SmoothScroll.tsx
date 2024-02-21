"use client";

import { useEffect, useRef } from "react";

export default function Link({ children }: { children: React.ReactNode }) {

 const scrollContainer = useRef<HTMLDivElement>(null)

 useEffect(() => {
  (async () => {

   try {

    const LocomotiveScroll = (await import("locomotive-scroll")).default;

    const ls = new LocomotiveScroll({
     el: scrollContainer.current!,
     reloadOnContextChange: true,
     smooth: true
    });

    return () => ls.destroy()

   } catch (error) { console.error(error) }

  })();
 }, []);

 return <div data-scroll-container ref={scrollContainer}>
  {children}
 </div>
}