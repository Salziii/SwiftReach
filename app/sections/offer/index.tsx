"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FirstPage from "./pages/left/1";
import SecondPage from "./pages/left/2";
import ThirdPage from "./pages/left/3";
import RightSide from "./pages/right";

export default function Offer() {
 useEffect(() => {
  const ctx = gsap.context(() => {
   gsap.registerPlugin(ScrollTrigger);
   ScrollTrigger.create({
    trigger: "#offer",
    pin: ".right",
    start: "top top",
    end: "bottom bottom",
   });
  });
  return () => ctx.revert();
 }, []);

 return (
  <section
   className="flex flex-col 2xl:flex-row justify-center 2xl:justify-start w-screen px-5 bg-card text-white shadow-inner-all"
   id="offer"
  >
   <div className="left w-full 2xl:w-1/2">
    <FirstPage />
    <SecondPage />
    <ThirdPage />
   </div>
   <div className="right hidden 2xl:block h-screen w-1/2">
    <RightSide />
   </div>
  </section>
 );
}
