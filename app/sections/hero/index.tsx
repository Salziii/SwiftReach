"use client";

import Image from "next/image";
import { Brain, Eye, LineChartIcon, PiggyBankIcon } from "lucide-react";
import Link from "next/link";
import { DefaultMotion, FlyInMotion } from "@/app/(components)/motion";
import StartButton from "@/app/(components)/StartButton";

export default function Hero() {
 return (
  <section
   className="px-5 flex flex-col xl:flex-row justify-start w-screen min-h-screen"
   id="hero"
  >
   <div className="w-full xl:w-1/2 flex flex-col justify-center">
    <DefaultMotion>
     <Image
      className="block md:hidden xl:block h-full w-full scale-90"
      src="/hero.ig-phone.webp"
      alt=""
      height={4167}
      width={4167}
      priority
     />
    </DefaultMotion>
   </div>
   <div className="pt-0 sm:pt-10 md:pt-32 xl:pt-0 w-full xl:w-1/2 flex justify-center">
    <div className="flex flex-col justify-center max-w-2xl">
     <FlyInMotion className="pb-8 font-bold text-2xl md:text-5xl">
      Venimus! Vidimus! Vicimus!
     </FlyInMotion>
     <FlyInMotion delay={0.05} className="pb-6 font-normal text-xl md:text-2xl">
      Wir helfen lokalen Unternehmen dabei, mehr zu verkaufen und mehr Leads
      durch Social Media Marketing zu generieren.
     </FlyInMotion>
     <div className="text-2xl md:text-3xl pb-6">
      <FlyInMotion delay={0.1} className="flex pb-2">
       <span className="flex flex-col justify-center pr-3">
        <PiggyBankIcon size={45} className="pr-2 text-secondary-foreground" />
       </span>
       <p className="flex flex-col justify-center">Mehr Verkäufe</p>
      </FlyInMotion>
      <FlyInMotion delay={0.2} className="flex pb-2">
       <span className="flex flex-col justify-center pr-3">
        <Eye size={45} className="pr-2 text-secondary-foreground" />
       </span>
       <p className="flex flex-col justify-center">Mehr Online Präsenz</p>
      </FlyInMotion>
      <FlyInMotion delay={0.3} className="flex pb-2">
       <span className="flex flex-col justify-center pr-3">
        <LineChartIcon size={45} className="pr-2 text-secondary-foreground" />
       </span>
       <p className="flex flex-col justify-center">
        Mehr Follower
       </p>
      </FlyInMotion>
     </div>
     <DefaultMotion delay={0.5}>
     <StartButton>Jetzt Skalieren 🚀</StartButton>
     </DefaultMotion>
    </div>
   </div>
  </section>
 );
}
