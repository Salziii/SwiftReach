import { motion } from "framer-motion";
import Image from "next/image";

export default function RightSide() {
 return (
  <div className="h-full w-full flex flex-col justify-center">
   <motion.div
    transition={{
     type: "spring",
     duration: 0.5,
     damping: 10
    }}
    initial={{ opacity: 0, scale: 0.75 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="flex justify-center"
   >
    <Image
     id="img"
     className="block md:hidden xl:block h-full w-full scale-90"
     src="/computer.png"
     alt=""
     height={4167}
     width={4167}
    />
   </motion.div>
  </div>
 );
}
