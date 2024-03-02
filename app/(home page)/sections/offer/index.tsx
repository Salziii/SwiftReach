import { WavyBackground } from "@/components/ui/wavy-background";
import { Ban } from "lucide-react";
import React from "react";
import { BsMegaphone } from "react-icons/bs";
import { FaPeopleRoof } from "react-icons/fa6";
import FirstPage from "./pages/1";
import SecondPage from "./pages/2";
import ThirdPage from "./pages/3";

export default function Offer() {
 const imgs: React.JSX.Element[] = [
  <FaPeopleRoof key={1} className="h-full w-full scale-50 text-secondary-foreground" />,
  <BsMegaphone key={2} className="h-full w-full scale-50 text-secondary-foreground" />,
  <Ban key={3} className="h-full w-full scale-50 text-secondary-foreground" />,
 ];

 return (
  <section
   className="h-[300vh] relative w-sceen text-white"
   id="offer"
   data-scroll-section
  >
   <div
    className="absolute top-0 left-0 w-screen h-screen"
    data-scroll
    data-scroll-sticky
    data-scroll-target="#offer"
   >
    <WavyBackground backgroundFill="#171717" colors={["#00BCE8", "#b133ce", "#782dac", "#b133ce", "#782dac"]} waveWidth={16} blur={8} />
   </div>
   <div className="absolute top-0 left-0 flex w-screen">
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
