"use client";

import Footer from "../(components)/footer";
import Strategy from "./sections/strategy";
import Hero from "./sections/hero";
import Offer from "./sections/offer";
import SmoothScrollProvider from "../(components)/smoothScroll";

export default function Home() {
 return (
  <SmoothScrollProvider>
   <>
    <Hero />
    <Offer />
    <Strategy />
   </>
   <Footer />
  </SmoothScrollProvider>
 );
}
