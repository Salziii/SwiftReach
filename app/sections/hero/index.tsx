"use client";

import Image from "next/image";
import { Brain, Check, Euro, Eye, Facebook, PiggyBankIcon } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
 return (
  <section
   className="px-5 flex flex-col xl:flex-row justify-start w-screen min-h-screen"
   id=""
  >
   <div className="w-full xl:w-1/2 flex flex-col justify-center">
    <motion.div
     transition={{
      type: "spring",
      damping: 10,
      stiffness: 100,
     }}
     initial={{ opacity: 0, scale: 0.75 }}
     animate={{ opacity: 1, scale: 1 }}
     className="flex justify-center"
    >
     <Image
      className="block md:hidden xl:block h-full w-full scale-90"
      src="/hero.ig-phone.webp"
      alt=""
      height={4167}
      width={4167}
      priority
     />
    </motion.div>
   </div>
   <div className="pt-0 sm:pt-10 md:pt-32 xl:pt-0 w-full xl:w-1/2 flex justify-center">
    <div className="flex flex-col justify-center max-w-2xl">
     <motion.h1
      transition={{
       type: "spring",
       duration: 0.5,
      }}
      initial={{ x: "100vw" }}
      animate={{ x: 0 }}
      className="pb-8 font-bold text-2xl md:text-5xl"
     >
      Venimus! Vidimus! Vicimus!
     </motion.h1>
     <motion.p
      transition={{
       type: "spring",
       duration: 0.5,
       delay: 0.05,
      }}
      initial={{ x: "100vw" }}
      animate={{ x: 0 }}
      className="pb-6 font-normal text-xl md:text-2xl"
     >
      Skalieren sie IHR Unternehmen und lassen sie IHRE Umsätze in die höhe
      Schießen. Alles nur{" "}
      <span className="font-semibold">wenige Klicks entfernt!</span>
     </motion.p>
     <div className="text-2xl md:text-3xl pb-6">
      <motion.div
       key={1}
       transition={{
        type: "spring",
        delay: 0.1,
        duration: 0.5,
       }}
       initial={{ x: "100vw" }}
       animate={{ x: 0 }}
       className="flex pb-2"
      >
       <span className="flex flex-col justify-center pr-3">
        <PiggyBankIcon size={45} className="pr-2 text-secondary-foreground" />
       </span>
       <p className="flex flex-col justify-center">Mehr Verkäufe / Verträge</p>
      </motion.div>
      <motion.div
       key={2}
       transition={{
        type: "spring",
        delay: 0.2,
        duration: 0.5,
       }}
       initial={{ x: "100vw" }}
       animate={{ x: 0 }}
       className="flex pb-2"
      >
       <span className="flex flex-col justify-center pr-3">
        <Eye size={45} className="pr-2 text-secondary-foreground" />
       </span>
       <p className="flex flex-col justify-center">Mehr Reichweite</p>
      </motion.div>
      <motion.div
       key={3}
       transition={{
        type: "spring",
        delay: 0.3,
        duration: 0.5,
       }}
       initial={{ x: "100vw" }}
       animate={{ x: 0 }}
       className="flex pb-2"
      >
       <span className="flex flex-col justify-center pr-3">
        <Brain size={45} className="pr-2 text-secondary-foreground" />
       </span>
       <p className="flex flex-col justify-center">
        Coole Marketing Strategien
       </p>
      </motion.div>
     </div>
     <motion.div
      transition={{
       type: "spring",
       duration: 1,
       delay: 0.5,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
     >
      <Link href="/getting-started">
       <button className="w-full md:w-3/4 mb-16 font-semibold text-xl rounded-full py-3 transition transform cursor-pointer bg-transparent border-2 border-primary shadow-md hover:scale-105 hover:shadow-xl">
        Jetzt Skalieren 🚀
       </button>
      </Link>
     </motion.div>
    </div>
   </div>
  </section>
 );
}
