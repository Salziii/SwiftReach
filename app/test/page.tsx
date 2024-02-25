"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import "./style.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

export default function Test() {
 const racesWrapper = useRef<HTMLDivElement>(null);
 const races = useRef<HTMLDivElement>(null);
 const main = useRef(null);

 useEffect(() => {
  (async () => {
   const LocomotiveScroll = (await import("locomotive-scroll")).default;
   const locomotiveScroll = new LocomotiveScroll({
    el: main.current!,
    smooth: true,
   });
  })();
 }, []);

 function getScrollAmount() {
  let racesWidth = races.current!.offsetWidth;
  return -(racesWidth - window.innerWidth);
 }

 useLayoutEffect(() => {
  gsap.registerPlugin(ScrollTrigger);

  const tween = gsap.to(races, {
   x: getScrollAmount,
   duration: 3,
   ease: "none",
  });

  ScrollTrigger.create({
   trigger: racesWrapper.current,
   start: "top 20%",
   end: () => `+=${getScrollAmount() * -1}`,
   pin: true,
   animation: tween,
   scrub: 1,
   invalidateOnRefresh: true,
   markers: true,
  });
 });

 return (
  <main className="h-[200vh]" ref={main}>
   <div className="space-50vh lightBG"></div>

   <div className="racesWrapper" ref={racesWrapper}>
    <div className="races" ref={races}>
     <h2>Monaco</h2>
     <h2>Austria</h2>
     <h2>Hungary</h2>
     <h2>Netherlands</h2>
     <h2>Japan</h2>
    </div>
   </div>

   <div className="space-100vh lightBG"></div>
  </main>
 );
}
