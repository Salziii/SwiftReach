"use client";

import StartButton from "@/app/(home page)/(comonents)/StartButton";
import { motion } from "framer-motion";
import Link from "next/link";

export default function FirstPage() {
 return (
  <div className="h-screen w-full flex justify-center py-16">
   <div className="flex flex-col justify-center max-w-2xl">
    <motion.h1
     transition={{
      type: "spring",
      duration: 0.5,
      damping: 10,
     }}
     initial={{ opacity: 0, scale: 0.75 }}
     whileInView={{ opacity: 1, scale: 1 }}
     viewport={{ once: true }}
     className="pb-8 font-bold text-4xl sm:text-5xl shadow-text-lg"
    >
     Was wir für Ihr Unternehmen tun
    </motion.h1>
    <motion.div
     transition={{
      type: "spring",
      duration: 0.1,
      damping: 10,
      delay: 0.2,
     }}
     initial={{ opacity: 0, scale: 0.75 }}
     whileInView={{ opacity: 1, scale: 1 }}
     viewport={{ once: true }}
     className="flex flex-col gap-4 pb-8 font-normal text-md sm:text-2xl shadow-text-sm"
    >
     <p>
      Wir führen neue Kunden direkt vor Ihre Tür durch gezielte Werbung auf
      Plattformen wie Google, YouTube, Facebook & Instagram
     </p>
     <p>
      Das ermöglicht es Ihnen, sich auf das Herzstück Ihres Geschäfts zu
      fokussieren, ohne im Dunkeln zu tappen, wenn es darum geht, wer als
      nächstes anklopft.
     </p>
    </motion.div>
    <motion.div
     transition={{
      type: "spring",
      duration: 0.5,
      damping: 10,
      delay: 0.2,
     }}
     initial={{ opacity: 0, scale: 0.75 }}
     whileInView={{ opacity: 1, scale: 1 }}
     viewport={{ once: true }}
    >
     <StartButton className="bg-body">Jetzt Skalieren 🚀</StartButton>
    </motion.div>
   </div>
  </div>
 );
}
