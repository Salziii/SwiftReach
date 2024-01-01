import { motion } from "framer-motion";
import Link from "next/link";

export default function SecondPage() {
 return (
  <div className="h-full 2xl:h-screen w-full flex justify-center py-16">
   <div className="flex flex-col justify-center max-w-2xl">
    <motion.p
     transition={{
      type: "spring",
      duration: 0.5,
      damping: 10,
     }}
     initial={{ opacity: 0, scale: 0.75 }}
     whileInView={{ opacity: 1, scale: 1 }}
     viewport={{ once: true }}
     className="pb-2 font-normal text-lg sm:text-2xl"
    >
     Was wir anbieten?
    </motion.p>
    <motion.h1
     transition={{
      type: "spring",
      duration: 0.5,
      damping: 10,
      delay: 0.1,
     }}
     initial={{ opacity: 0, scale: 0.75 }}
     whileInView={{ opacity: 1, scale: 1 }}
     viewport={{ once: true }}
     className="pb-8 font-bold text-4xl sm:text-5xl"
    >
     Paid Advertising
    </motion.h1>
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
     className="flex flex-col gap-4 pb-8 font-normal text-md sm:text-2xl"
    >
     <p>Werbung, nur Werbung</p>
     <p>
      Wir widmen uns einer einzigen Sache - und das mit monastischer Hingabe und
      einer Exzellenz, die ihresgleichen sucht.
     </p>
     <p>
      Wenn Sie nach einer Agentur suchen, die eine umfassende Lösung für alles
      anbietet, jedoch den Fortschritt nicht wirklich vorantreibt, dann sind wir
      vielleicht nicht die richtige Wahl für Sie.
     </p>
    </motion.div>
    <motion.div
     transition={{
      type: "spring",
      duration: 0.5,
      damping: 10,
      delay: 0.3,
     }}
     initial={{ opacity: 0, scale: 0.75 }}
     whileInView={{ opacity: 1, scale: 1 }}
     viewport={{ once: true }}
    >
     <Link href="/getting-started">
      <button className="w-full font-semibold text-xl rounded-full py-3 transition transform cursor-pointer bg-body bg-background text-foreground shadow-md hover:scale-105 hover:shadow-xl">
       Jetzt Skalieren 🚀
      </button>
     </Link>
    </motion.div>
   </div>
  </div>
 );
}
