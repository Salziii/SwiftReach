import StartButton from "@/app/(home page)/(comonents)/StartButton";
import { motion } from "framer-motion";

export default function FirstPage() {
 return (
  <div className="h-screen w-full flex justify-center py-16 z-0">
   <div className="flex flex-col justify-center max-w-3xl">
    <motion.h1
     transition={{
      type: "spring",
      duration: 0.5,
      damping: 10
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
      damping: 10
     }}
     initial={{ opacity: 0, scale: 0.75 }}
     whileInView={{ opacity: 1, scale: 1 }}
     viewport={{ once: true }}
     className="flex flex-col gap-4 pb-8 font-normal text-md sm:text-2xl shadow-text-sm"
    >
     <p>
      Wir führen neue Kunden durch zielgerichtete Werbung direkt vor Ihre Tür.
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
      damping: 10
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
