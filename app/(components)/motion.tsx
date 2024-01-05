import { motion } from "framer-motion";

type MotionDivProps = {
 children: React.ReactNode;
 delay?: number;
 className?: string;
};

export function DefaultMotion({ delay, children, className }: MotionDivProps) {
 return (
  <motion.div
   transition={{
    type: "spring",
    damping: 10,
    stiffness: 100,
    delay: delay ?? 0,
   }}
   initial={{ opacity: 0, scale: 0.75 }}
   whileInView={{ opacity: 1, scale: 1 }}
   viewport={{ once: true }}
   className={className}
  >
   {children}
  </motion.div>
 );
}

export function RotateMotion({ delay, children, className }: MotionDivProps) {
 return (
  <DefaultMotion delay={delay}>
   <motion.div
    transition={{
     type: "spring",
     stiffness: 40,
     damping: 10,
     delay: (delay ?? 0) + 0.1,
    }}
    initial={{ rotateZ: 360 }}
    whileInView={{ rotateZ: 0 }}
    viewport={{ once: true }}
    className={className}
   >
    {children}
   </motion.div>
  </DefaultMotion>
 );
}

export function FlyInMotion({ delay, children, className }: MotionDivProps) {
 return (
  <motion.div
   transition={{
    type: "spring",
    delay: delay,
    duration: 0.5,
   }}
   initial={{ translateX: "100vw" }}
   animate={{ translateX: 0 }}
   viewport={{ once: true }}
   className={className}
  >
   {children}
  </motion.div>
 );
}
