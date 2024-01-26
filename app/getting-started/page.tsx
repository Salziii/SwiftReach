"use client"

import Forms from "./Forms";
import Footer from "../(components)/footer";
import useLocomotiveScroll from "@/lib/hooks/useLokomotiveScroll";

export default () => {

 // WENN loggedIn: auf / schicken + Toast (Du bist bereits in einer Company)

 useLocomotiveScroll({
  smooth: true,
  smoothMobile: true,
 });

 return (
  <div data-scroll-container>
   <article className="h-screen flex flex-col justify-center">
   <div className="h-5/6 w-full flex">
    <Forms />
   </div>
  </article>
  <Footer />
  </div>
 );
};
