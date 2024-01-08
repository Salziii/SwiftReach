"use client";

import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { DefaultMotion } from "@/app/(components)/motion";
import StartButton from "@/app/(home page)/(comonents)/StartButton";

export default function Clients() {
 const clients = [
  {
   src: "/clients/CocaCola-Logo.svg.png",
   href: "https://coca-cola.com/",
  },
  { src: "/clients/HARIBO_Logo.svg.png", href: "https://haribo.com/" },
  {
   src: "/clients/Porsche_Wortmarke.svg.png",
   href: "https://porsche.de/",
  },
  {
   src: "/clients/Bugatti_logo.svg.png",
   href: "https://bugatti.com/",
  },
  {
   src: "/clients/Logo_of_Red_bull.svg.png",
   href: "https://www.redbull.com/",
  },
 ];

 return (
  <section
   className="w-full bg-card text-white shadow-inner-all"
   id="clients"
  >
   <div className="flex flex-col py-32">
    <DefaultMotion className="flex justify-center text-3xl sm:text-6xl font-bold shadow-text-lg mb-32">
     Unsere Glücklichen Kunden
    </DefaultMotion>
    <div className="flex justify-center mb-32">
     <div className="w-3/4 grid grid-cols-1 sm:grid-cols-4 gap-x-20 gap-y-10">
      {clients.map((client, i) => (
       <Link href={client.href} className="flex flex-col justify-center">
        <DefaultMotion delay={(i % 4) * 0.2}>
         <Image
          src={client.src}
          className="transition transform cursor-pointer hover:-translate-y-2 hover:scale-105 "
          alt=""
          height={183}
          width={885}
         />
        </DefaultMotion>
       </Link>
      ))}
      {Array.from({ length: 12 - clients.length }).map((_, i) => (
       <Skeleton className="w-full h-full min-h-36 rounded-lg transition transform cursor-pointer hover:scale-105" />
      ))}
     </div>
    </div>
    <DefaultMotion className="flex justify-center text-5xl font-bold shadow-text-lg mb-8">
     Werde Einer Von Ihnen!
    </DefaultMotion>
    <DefaultMotion delay={0.25} className="flex justify-center w-full">
     <StartButton className="bg-body w-96">Jetzt Skalieren 🚀</StartButton>
    </DefaultMotion>
   </div>
  </section>
 );
}
