"use client";

import Footer from "../(components)/footer";
import Strategy from "./sections/strategy";
import Hero from "./sections/hero";
import Offer from "./sections/offer";
import SmoothScroll from "@/lib/hooks/SmoothScroll";

export default function Home() { 
 return <SmoothScroll>
  <div>
   <Hero />
   <Offer />
   <Strategy />
  </div>
  <Footer />
 </SmoothScroll>
}
