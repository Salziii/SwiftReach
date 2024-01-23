"use client";

import useLocomotiveScroll from "@/lib/hooks/useLokomotiveScroll";
import Footer from "../(components)/footer";

export default function Home() {
 
 useLocomotiveScroll({
  smooth: true,
  smoothMobile: true,
 });

 return <div data-scroll-container>
  <div className="min-h-screen"></div>
  <Footer />
 </div>
}

{/* <div id="button">
   {el ? (
    <PopupButton
     url="https://calendly.com/administration-_b0/discovery-call"
     rootElement={el}
     text={children}
     pageSettings={{
      backgroundColor: "272727",
      hideEventTypeDetails: false,
      hideLandingPageDetails: false,
      primaryColor: "B133CE",
      textColor: "f8fafc",
      hideGdprBanner: true
     }}
     className={"w-full font-bold text-xl rounded-full py-3 transition transform cursor-pointer bg-transparent text-white border-2 border-white shadow-xl hover:scale-105 hover:shadow-2xl " + className}
    />
   ) : (
    <></>
   )}
  </div> */}