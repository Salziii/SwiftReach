"use client";

import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

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
  <section className="w-screen bg-white text-black" id="clients">
   <div className="flex flex-col pt-16 gap-10">
    <motion.div
     transition={{
      type: "spring",
      damping: 10,
      stiffness: 100
     }}
     initial={{ opacity:0, scale: 0.75 }}
     whileInView={{ opacity:1, scale: 1 }}
     viewport={{ once: true }}
     className="flex justify-center text-5xl font-bold text-black"
    >
     Unsere Glücklichen Kunden
    </motion.div>
    <div className="flex justify-center">
     <div className="w-3/4 grid grid-cols-4 gap-x-20 gap-y-10">
      {clients.map((client, i) => (
       <Link href={client.href} className="flex flex-col justify-center">
        <motion.div
         transition={{
          type: "spring",
          damping: 10,
          stiffness: 100,
          delay: i % 4 * 0.2
         }}
         initial={{ opacity: 0, scale: 0.75 }}
         whileInView={{ opacity: 1, scale: 1 }}
         viewport={{ once: true }}
        >
         <Image
          src={client.src}
          className="transition transform cursor-pointer hover:scale-105 "
          alt=""
          height={183}
          width={885}
         />
        </motion.div>
       </Link>
      ))}
      {Array.from({ length: 12 - clients.length }).map((_, i) => (
       <Skeleton className="w-full h-full min-h-36 rounded-lg transition transform cursor-pointer hover:scale-105" />
      ))}
     </div>
    </div>
    <div className="flex flex-col gap-6 py-16 ">
     <motion.div
      transition={{
       type: "spring",
       damping: 10,
       stiffness: 100
      }}
      initial={{ opacity: 0, scale: 0.75 }}
      whileInView={{ opacity: 1, scale: 1 }}
      className="flex justify-center text-5xl font-bold text-black"
     >
      Werde Einer Von Ihnen!
     </motion.div>
     <motion.div
      transition={{
       type: "spring",
       damping: 10,
       stiffness: 100,
       delay: 0.25,
      }}
      initial={{ opacity: 0, scale: 0.75 }}
      whileInView={{ opacity: 1, scale: 1 }}
      className="flex justify-center w-full"
     >
      <Link href="/getting-started">
       <button className="w-96 font-semibold text-xl rounded-full py-3 transition transform cursor-pointer bg-body bg-background text-foreground shadow-md hover:scale-105 hover:shadow-xl">
        Heute Noch Starten 🚀
       </button>
      </Link>
     </motion.div>
    </div>
   </div>
  </section>
 );
}
