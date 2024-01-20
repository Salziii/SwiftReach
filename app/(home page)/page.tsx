"use client";

import Footer from "../(components)/footer";
import Strategy from "./sections/strategy";
import Hero from "./sections/hero";
import Offer from "./sections/offer";
import useLocomotiveScroll from "@/lib/hooks/useLokomotiveScroll";
import Loader from "./(comonents)/Loader";

export default function Home() {
 
 useLocomotiveScroll({
  smooth: true,
  smoothMobile: true,
 });

 return (
  <>
   <Loader />
   <div data-scroll-container>
    <>
     <Hero />
     <Offer />
     <Strategy />
     <div className="h-screen w-screen bg-background" data-scroll-section />
    </>
    <Footer />
   </div>
  </>
 );
}
