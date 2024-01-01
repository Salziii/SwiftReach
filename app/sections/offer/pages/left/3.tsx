import { motion } from "framer-motion";
import { Ban } from "lucide-react";
import Link from "next/link";

export default function ThirdPage() {
 // "Im Tanz der Hingabe entsteht das Meisterstück!",
 // "In der Kunst des Meisterns ist Hingabe das fehlende Puzzlestück!",
 // "Mit Hingabe zum Gipfel des Meisterwerks!",
 // "Meisterhaftes Handwerk beginnt mit der Poesie der Passion!",
 // "Das Geheimnis der Meisterschaft liegt in der Verbundenheit zum Detail!",
 // "Enthusiasmus ist der Pinsel, der das Gemälde der Meisterschaft zum Leben erweckt!",
 // "Meisterschaft ist der Schatten, den die Hingabe wirft!",
 // "Das Geheimnis des Meisterseins? Hingabe in jedem Pinselstrich!",
 // "Mit Hingabe gewebt, wird das Kunstwerk zum Meisterstück!",
 // "Hingabe ist der harmonische Akkord in der Symphonie des Meisterns!"

 const nogos = [
  "Web Design",
  "Content Creation",
  "Email Marketing",
  "Social Media Management",
  "Instagram Growth",
  "PR Service",
 ];

 return (
  <div className="h-full 2xl:h-screen w-full flex justify-center py-16">
   <div className="flex flex-col justify-center max-w-2xl">
    <motion.p
     transition={{
      type: "spring",
      stiffness: 40,
      damping: 10,
     }}
     initial={{ opacity: 0, scale: 0.75 }}
     whileInView={{ opacity: 1, scale: 1 }}
     viewport={{ once: true }}
     className="pb-2 font-normal text-lg sm:text-2xl"
    >
     Ganz nach dem Motto
    </motion.p>
    <motion.h1
     transition={{
      type: "spring",
      stiffness: 40,
      damping: 10,
      delay: 0.05,
     }}
     initial={{ opacity: 0, scale: 0.75 }}
     whileInView={{ opacity: 1, scale: 1 }}
     viewport={{ once: true }}
     className="pb-4 font-bold text-3xl sm:text-4xl"
    >
     Meisterschaft ist der Schatten den die Hingabe wirft
    </motion.h1>
    <motion.p
     transition={{
      type: "spring",
      stiffness: 40,
      damping: 10,
      delay: 0.1,
     }}
     initial={{ opacity: 0, scale: 0.75 }}
     whileInView={{ opacity: 1, scale: 1 }}
     viewport={{ once: true }}
     className="font-normal text-md sm:text-2xl pb-6"
    >
     Also bieten wir nichts als Paid Advertising an...
    </motion.p>
    <div className="text-2xl font-bold pb-8">
     {nogos.map((nogo, i) => (
      <div key={nogo} className="flex pb-2">
       <span className="flex flex-col justify-center pr-3">
        <motion.div
         transition={{
          type: "spring",
          stiffness: 40,
          damping: 10,
          delay: 0.1 * i + 0.2,
         }}
         initial={{ opacity: 0, rotateZ: 360, scale: 0.75 }}
         whileInView={{ opacity: 1, rotateZ: 0, scale: 1 }}
         viewport={{ once: true }}
        >
         <Ban size={28} className="text-red-600" />
        </motion.div>
       </span>
       <motion.p
        transition={{
         type: "spring",
         stiffness: 40,
         damping: 10,
         delay: 0.1 * i + 0.2,
        }}
        initial={{ opacity: 0, scale: 0.75 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="flex flex-col justify-center"
       >
        {nogo}
       </motion.p>
      </div>
     ))}
    </div>
    <motion.div
     transition={{
      type: "spring",
      duration: 0.5,
      damping: 10,
      delay: 0.05 * nogos.length + 0.2,
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
