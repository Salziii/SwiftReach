import React from "react";
import FirstPage from "./pages/1";
import SecondPage from "./pages/2";
import ThirdPage from "./pages/3";
import Image from "next/image";

export default function Offer() {
 const imgs: React.JSX.Element[] = [
  <Image
   key={1}
   className="h-full w-full scale-75"
   src="/offer.fb-phone.png"
   alt=""
   height={1000}
   width={1000}
  />,
  <Image
   key={2}
   className="h-full w-full scale-75"
   src="/offer.fb-phone.png"
   alt=""
   height={1000}
   width={1000}
  />,
  <Image
  key={3}
   className="h-full w-full scale-75"
   src="/offer.fb-phone.png"
   alt=""
   height={1000}
   width={1000}
  />,
 ];

 return (
  <section
   className="w-sceen bg-card text-white"
   id="offer"
   data-scroll-section
  >
   <div className="flex w-screen">
    <div className="w-1/2">
     <FirstPage />
     <SecondPage />
     <ThirdPage />
    </div>
    <div className="w-1/2 h-screen">
     {imgs.map((img, i) => (
      <div key={i}
       className="h-full w-full flex flex-col justify-center"
       data-scroll
       data-scroll-speed="8"
      >
       {img}
      </div>
     ))}
    </div>
   </div>
  </section>
 );
}
